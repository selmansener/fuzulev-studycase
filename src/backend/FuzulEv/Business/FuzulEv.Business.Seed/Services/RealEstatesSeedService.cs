using Bogus;

using FuzulEv.Business.Seed.Configuration;
using FuzulEv.Business.Seed.Services.Base;
using FuzulEv.DataAccess.Context;
using FuzulEv.Domains.Models.RealEstateDomain;
using FuzulEv.Infrastructure.Shared.Enums;

using Microsoft.EntityFrameworkCore;

using System.Collections.Immutable;

namespace FuzulEv.Business.Seed.Services
{
    internal class RealEstatesSeedService : BaseSeedService
    {
        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Locations);

        public RealEstatesSeedService(FuzulEvDbContext dbContext) : base(dbContext)
        {
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var faker = new Faker(locale: "tr");

            var locations = await _dbContext.Locations.ToListAsync(cancellationToken);

            foreach (var location in locations)
            {
                for (int i = 0; i < 10; i++)
                {
                    var realEstate = new RealEstate(
                        $"{faker.Lorem.Sentence(wordCount: 3)} {faker.Address.BuildingNumber()}",
                        faker.Random.Decimal(min: 100, max: 1000),
                        faker.PickRandomWithout<RealEstateType>(RealEstateType.None),
                        location.Id,
                        faker.Address.FullAddress());

                    await _dbContext.AddAsync(realEstate, cancellationToken);
                }
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
