using FuzulEv.DataAccess.Context;
using FuzulEv.DataAccess.Repositories;
using FuzulEv.DataAccess.Repositories.AccountDomain;
using FuzulEv.Infrastructure.Shared.Configurations;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FuzulEv.DataAccess.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDataAccess(this IServiceCollection services, DbConnectionOptions dbConnectionOptions, IHostEnvironment environment)
        {
            string dbConnectionString = new SqlConnectionStringBuilder
            {
                DataSource = dbConnectionOptions.Server,
                UserID = dbConnectionOptions.UserName,
                Password = dbConnectionOptions.Password,
                InitialCatalog = dbConnectionOptions.Database,
                Encrypt = false,
                TrustServerCertificate = true
            }.ConnectionString;

            services.AddDbContext<FuzulEvDbContext>(opts =>
            {
                if (environment.IsDevelopment())
                {
                    opts.EnableDetailedErrors();
                    opts.EnableSensitiveDataLogging();
                }

                opts.UseSqlServer(dbConnectionString, sqlOptions =>
                {
                    // TODO: fix transaction issue and try to enable this feature
                    // sqlOptions.EnableRetryOnFailure();
                    sqlOptions.UseCompatibilityLevel(120);
                });
            });

            services.Scan(scan => scan.FromAssemblyOf<AccountRepository>()
                .AddClasses(classes => classes.AssignableTo(typeof(IBaseRepository<>)))
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            return services;
        }
    }
}
