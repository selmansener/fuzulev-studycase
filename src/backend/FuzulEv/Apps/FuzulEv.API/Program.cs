
using FuzulEv.API.SwaggerConfiguration;
using FuzulEv.API.Configuration;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

using System.Net;
using System.Security.Claims;
using FuzulEv.API.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security;
using FuzulEv.Infrastructure.Shared.Configurations;
using FuzulEv.Business.Extensions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using FuzulEv.API.Middlewares;
using Mapster;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace FuzulEv.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            const string ApiTitle = "FuzulEv";
            const string SwaggerEndpoint = "/swagger/v1/swagger.json";

            var builder = WebApplication.CreateBuilder(args);

            IHostEnvironment environment = builder.Environment;


            builder.Services.AddCors(corsOptions =>
            {
                corsOptions.AddDefaultPolicy(policyBuilder =>
                {
                    policyBuilder.AllowAnyHeader();
                    policyBuilder.AllowAnyMethod();
                    policyBuilder.AllowAnyOrigin();
                });
            });

            TypeAdapterConfig.GlobalSettings.Scan(typeof(Program).Assembly, typeof(Business.Extensions.ServiceCollectionExtensions).Assembly);
            TypeAdapterConfig.GlobalSettings.Default.IgnoreNullValues(true);

            builder.Services.Configure<ConfigurationOptions>(builder.Configuration);

            builder.Services.AddHttpContextAccessor();

            var dbConnectionOptions = builder.Configuration.GetSection("DbConnectionOptions").Get<DbConnectionOptions>();
            builder.Services.AddBusiness(dbConnectionOptions, environment);

            var authOptions = builder.Configuration.GetSection("Auth").Get<AuthenticationOptions>();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    

                    options.Authority = authOptions.Authority;
                    options.Audience = authOptions.Audience;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        NameClaimType = ClaimTypes.NameIdentifier
                    };
                });

            var permissionsInstance = new Permissions();
            var permissions = typeof(Permissions).GetFields();

            builder.Services.AddAuthorization(options =>
            {
                foreach (var permissionField in permissions)
                {
                    var permission = (string)permissionField.GetValue(permissionsInstance);
                    options.AddPolicy(permission, policy => policy.Requirements.Add(new HasScopeRequirement(permission, authOptions.Authority)));
                }
            });

            builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            builder.Services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = (int)HttpStatusCode.PermanentRedirect;
                options.HttpsPort = 443;
            });

            var mvcBuilder = builder.Services.AddMvc(ConfigureMvc)
                .AddNewtonsoftJson(ConfigureNewtonsoftJson)
                .ConfigureApiBehaviorOptions(ConfigureApiBehavior);

            // Add services to the container.
            builder.Services.AddProblemDetails();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGenNewtonsoftSupport();
            builder.Services.AddSwaggerGen(ConfigureSwaggerGenerator);

            var app = builder.Build();

            app.UseMiddleware<ExceptionHandlerMiddleware>();

            // Configure the HTTP request pipeline.
            // if (app.Environment.IsDevelopment())
            // {
                app.UseStaticFiles();
                app.UseSwagger();
                app.UseSwaggerUI(ConfigureSwaggerUI);
            // }

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();

            void ConfigureSwaggerUI(SwaggerUIOptions options)
            {
                options.SwaggerEndpoint(SwaggerEndpoint, ApiTitle);
                options.DocExpansion(DocExpansion.None);
                options.DisplayRequestDuration();
                options.OAuthClientId(builder.Configuration["Auth:ClientId"]);
                options.InjectJavascript("https://code.jquery.com/jquery-3.6.0.min.js");
                options.InjectJavascript("../js/swagger-seed-dropdown-sorting.js");
            }

            string DefaultSchemaIdSelector(Type modelType)
            {
                if (!modelType.IsConstructedGenericType)
                {
                    return modelType.Name;
                }

                string prefix = modelType.GetGenericArguments()
                    .Select(genericArg => DefaultSchemaIdSelector(genericArg))
                    .Aggregate((previous, current) => previous + current);

                return prefix + modelType.Name.Split('`').First();
            }

            void ConfigureSwaggerGenerator(SwaggerGenOptions options)
            {
                options.SupportNonNullableReferenceTypes();
                options.OperationFilter<ResolveDynamicQueryEndpoints>("dqb");

                options.OperationFilter<ApiKeyHeaderParameterOperationFilter>();

                options.SwaggerDoc("v1", new OpenApiInfo { Title = ApiTitle, Version = "v1" });
                options.CustomSchemaIds(DefaultSchemaIdSelector);


                var scopes = new Dictionary<string, string>
                {
                    { "openid", "OpenId" }
                };

                foreach (var permissionField in permissions)
                {
                    var permission = (string)permissionField.GetValue(permissionsInstance);
                    scopes.Add(permission, permissionField.Name);
                }

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.OAuth2,
                    Scheme = "Bearer",
                    OpenIdConnectUrl = new Uri("https://selman-personal.eu.auth0.com/.well-known/openid-configuration", UriKind.Absolute),
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri("https://selman-personal.eu.auth0.com/authorize?audience=https://academyplus.com", UriKind.Absolute),
                            Scopes = scopes
                        }
                    }
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                            Type = SecuritySchemeType.OAuth2,
                            OpenIdConnectUrl = new Uri("https://selman-personal.eu.auth0.com/.well-known/openid-configuration", UriKind.Absolute),
                            Flows = new OpenApiOAuthFlows
                            {
                                Implicit = new OpenApiOAuthFlow
                                {
                                    AuthorizationUrl = new Uri("https://selman-personal.eu.auth0.com/authorize?audience=https://academyplus.com", UriKind.Absolute),
                                    Scopes = scopes
                                }
                            }
                        },
                        new List<string>()
                    }
                });

                var enabledAreas = new List<string>
                {
                    "api"
                };

                //if (!builder.Environment.IsProduction())
                //{
                    enabledAreas.Add("dev");
                //}

                options.DocumentFilter<SwaggerAreaFilter>(new object[] { enabledAreas.ToArray() });
            }

            void ConfigureMvc(MvcOptions options)
            {
                // This line adds a caching profile to use in controllers or actions.
                options.CacheProfiles.Add("Default", new CacheProfile { Duration = -1, Location = ResponseCacheLocation.None, NoStore = true });
                // This line adds default cache profile to all controllers as a filter.
                options.Filters.Add(new ResponseCacheAttribute { CacheProfileName = "Default" });
            }

            void ConfigureNewtonsoftJson(MvcNewtonsoftJsonOptions options)
            {
                options.SerializerSettings.ContractResolver =
                      new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.Converters.Add(new StringEnumConverter());
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                options.SerializerSettings.DateFormatString = "yyyy-MM-ddTHH:mm:ss.FFFZ";
            }

            void ConfigureApiBehavior(ApiBehaviorOptions options)
            {
                // SuppressModelStateInvalidFilter prevents automatically returning HttpStatus 400 when the ModelState is not valid.
                // The reason to preventing this is throwing a ValidationException to customize the response with a special format.
                // Related code can be found in ReportModelValidationErrorsFilter.
                options.SuppressModelStateInvalidFilter = true;
            }
        }
    }
}
