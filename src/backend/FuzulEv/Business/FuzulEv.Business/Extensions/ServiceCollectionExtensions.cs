using FuzulEv.DataAccess.Extensions;
using FuzulEv.Infrastructure.Shared.Configurations;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FuzulEv.Business.Seed;

namespace FuzulEv.Business.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddBusiness(this IServiceCollection services, DbConnectionOptions dbConnectionOptions, IHostEnvironment hostingEnvironment)
        {
            services.AddDataAccess(dbConnectionOptions, hostingEnvironment);

            services.AddMediatR(config =>
            {
                //config.RegisterServicesFromAssemblyContaining<GetFeaturedPlaylists>();
            });

            //if (hostingEnvironment.IsDevelopment())
            //{
                services.AddSeedServices(hostingEnvironment.EnvironmentName);
            //}
            
            
            return services;
        }
    }
}
