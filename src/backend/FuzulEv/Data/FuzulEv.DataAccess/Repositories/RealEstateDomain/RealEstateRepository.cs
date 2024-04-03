using FuzulEv.DataAccess.Context;
using FuzulEv.Domains.Models.RealEstateDomain;

namespace FuzulEv.DataAccess.Repositories.RealEstateDomain
{
    public interface IRealEstateRepository : IBaseRepository<RealEstate> { }

    internal class RealEstateRepository : BaseRepository<RealEstate>, IRealEstateRepository
    {
        public RealEstateRepository(FuzulEvDbContext baseDb) : base(baseDb)
        {
        }
    }
}
