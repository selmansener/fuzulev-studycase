using FluentValidation;

using FuzulEv.Business.CQRS.RealEstateDomain.DTOs;
using FuzulEv.Business.DTOs;
using FuzulEv.DataAccess.Repositories.RealEstateDomain;
using FuzulEv.Infrastructure.Shared.Enums;

using Mapster;

using MediatR;

using Microsoft.EntityFrameworkCore;

using System.Globalization;
using System.Linq;

namespace FuzulEv.Business.CQRS.RealEstateDomain.Queries
{
    public class RealEstatesQuery : IRequest<PaginationDTO<RealEstateDTO>>
    {
        public int Offset { get; set; }

        public int Count { get; set; }

        public decimal MinPriceInclusive { get; set; }

        public decimal MaxPriceInclusive { get; set; }

        public string Types { get; set; }

        public string Cities { get; set; }

        public string Districts { get; set; }
    }

    internal class RealEstatesQueryValidator : AbstractValidator<RealEstatesQuery>
    {
        public RealEstatesQueryValidator()
        {
            RuleFor(x => x.Count).NotEmpty();
            RuleFor(x => x.MaxPriceInclusive).GreaterThan(x => x.MinPriceInclusive);
        }
    }

    internal class RealEstatesQueryHandler : IRequestHandler<RealEstatesQuery, PaginationDTO<RealEstateDTO>>
    {
        private readonly IRealEstateRepository _realEstateRepository;

        public RealEstatesQueryHandler(IRealEstateRepository realEstateRepository)
        {
            _realEstateRepository = realEstateRepository;
        }

        public async Task<PaginationDTO<RealEstateDTO>> Handle(RealEstatesQuery realeStatesQueryRequest, CancellationToken cancellationToken)
        {
            var query = _realEstateRepository.GetAllAsNoTracking()
                .Where(x => realeStatesQueryRequest.MinPriceInclusive <= x.Price && x.Price <= realeStatesQueryRequest.MaxPriceInclusive)
                .ProjectToType<RealEstateDTO>();

            if (!string.IsNullOrWhiteSpace(realeStatesQueryRequest.Types))
            {
                var types = realeStatesQueryRequest.Types.Split(',');

                var parsedTypes = types.Select(x => Enum.Parse<RealEstateType>(x)).ToList();

                query = query.Where(x => parsedTypes.Contains(x.Type));
            }

            if (!string.IsNullOrWhiteSpace( realeStatesQueryRequest.Cities))
            {
                var cities = realeStatesQueryRequest.Cities.Split(',');

                query = query.Where(x => cities.Contains(x.City));

                if (!string.IsNullOrWhiteSpace(realeStatesQueryRequest.Districts))
                {
                    var districts = realeStatesQueryRequest.Districts.Split(',');

                    query = query.Where(x => districts.Contains(x.District));
                }
            }

            var totalRowCount = await query.CountAsync(cancellationToken);
            var data = await query.Skip(realeStatesQueryRequest.Offset).Take(realeStatesQueryRequest.Count).ToListAsync();

            return new PaginationDTO<RealEstateDTO>
            {
                TotalRowCount = totalRowCount,
                Data = data
            };
        }
    }
}
