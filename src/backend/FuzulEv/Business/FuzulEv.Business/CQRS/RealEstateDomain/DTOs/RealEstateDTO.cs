using FuzulEv.Domains.Models.RealEstateDomain;
using FuzulEv.Infrastructure.Shared.Enums;

using Mapster;

namespace FuzulEv.Business.CQRS.RealEstateDomain.DTOs
{
    public class RealEstateDTO
    {
        public int Id { get; set; }

        public decimal Price { get; set; }

        public string Title { get; set; }

        public RealEstateType Type { get; set; }

        public int LocationId { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Address { get; set; }

        public DateTime CreatedAt { get; set; }

    }

    public class RealEstateDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<RealEstate, RealEstateDTO>()
                .Map(dest => dest.City, src => src.Location.City)
                .Map(dest => dest.District, src => src.Location.District);
        }
    }
}
