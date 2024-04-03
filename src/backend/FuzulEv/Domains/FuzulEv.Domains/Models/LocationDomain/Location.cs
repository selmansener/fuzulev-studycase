using FuzulEv.Domains.Base;
using FuzulEv.Domains.Models.RealEstateDomain;

namespace FuzulEv.Domains.Models.LocationDomain
{
    public class Location : BaseEntity
    {
        private readonly List<RealEstate> _realEstates = new List<RealEstate>();

        public Location(string city, string district)
        {
            City = city;
            District = district;
        }

        public string City { get; private set; }

        public string District { get; private set; }

        public IReadOnlyList<RealEstate> RealEstates => _realEstates;
    }
}
