using FuzulEv.Business.Utils.AddressDomain;

using Microsoft.Extensions.DependencyInjection;

namespace FuzulEv.Business.Utils.Extensions
{
    public static class BusinessUtilExtensions
    {
        public static IServiceCollection AddBusinessUtils(this IServiceCollection services)
        {
            services.AddSingleton<IAddressService, AddressService>();

            return services;
        }
    }
}
