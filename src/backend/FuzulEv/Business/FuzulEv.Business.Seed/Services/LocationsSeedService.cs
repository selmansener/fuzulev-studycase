using FuzulEv.Business.Seed.Services.Base;
using FuzulEv.Business.Utils.AddressDomain;
using FuzulEv.DataAccess.Context;
using FuzulEv.Domains.Models.LocationDomain;

namespace FuzulEv.Business.Seed.Services
{
    internal class LocationsSeedService : BaseSeedService
    {
        private readonly IAddressService _addressService;

        public LocationsSeedService(FuzulEvDbContext dbContext, IAddressService addressService) : base(dbContext)
        {
            _addressService = addressService;
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {

            var cities = _addressService.GetCities();

            foreach (var city in cities)
            {
                var districts = _addressService.GetDistricts(city.Code);

                foreach (var district in districts)
                {
                    var location = new Location(city.Name, district.Name);

                    await _dbContext.AddAsync(location, cancellationToken);
                }
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
