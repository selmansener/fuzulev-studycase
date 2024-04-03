using FuzulEv.DataAccess.Context;
using FuzulEv.Domains.Models.LocationDomain;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuzulEv.DataAccess.Repositories.LocationDomain
{
    public interface ILocationRepository : IBaseRepository<Location> { }

    internal class LocationRepository : BaseRepository<Location>, ILocationRepository
    {
        public LocationRepository(FuzulEvDbContext baseDb) : base(baseDb)
        {
        }
    }
}
