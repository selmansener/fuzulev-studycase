using FuzulEv.Domains.Base;
using FuzulEv.Domains.Models.LocationDomain;
using FuzulEv.Infrastructure.Shared.Enums;

namespace FuzulEv.Domains.Models.RealEstateDomain
{
    public class RealEstate : BaseEntity
    {
        public RealEstate(string title, decimal price, RealEstateType type, int locationId, string address)
        {
            Title = title;
            Price = price;
            Type = type;
            LocationId = locationId;
            Address = address;
        }

        public string Title { get; private set; }

        public decimal Price { get; private set; }

        public RealEstateType Type { get; private set; }

        public int LocationId { get; private set; }

        public Location Location { get; private set; }

        public string Address { get; private set; }
    }
}
