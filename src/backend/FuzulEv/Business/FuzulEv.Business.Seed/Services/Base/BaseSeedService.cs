using System.Collections.Immutable;

using FuzulEv.Business.Seed.Configuration;
using FuzulEv.DataAccess.Context;

namespace FuzulEv.Business.Seed.Services.Base
{
    internal interface ISeedService
    {
        Task Execute(CancellationToken cancellationToken);

        ImmutableList<SeedServiceType> GetDependencies();
    }

    internal abstract class BaseSeedService : ISeedService
    {
        protected readonly FuzulEvDbContext _dbContext;

        protected BaseSeedService(FuzulEvDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected virtual ImmutableList<SeedServiceType> Dependencies { get; } = ImmutableList<SeedServiceType>.Empty;

        public abstract Task Execute(CancellationToken cancellationToken);

        public ImmutableList<SeedServiceType> GetDependencies()
        {
            return Dependencies;
        }
    }
}
