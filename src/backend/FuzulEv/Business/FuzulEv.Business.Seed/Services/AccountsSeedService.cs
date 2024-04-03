using FuzulEv.Business.Seed.Data;
using FuzulEv.Business.Seed.Services.Base;
using FuzulEv.DataAccess.Context;
using FuzulEv.Domains.Models.AccountDomain;

namespace FuzulEv.Business.Seed.Services
{
    internal class AccountsSeedService : BaseSeedService
    {
        private readonly SeedData _seedData;

        public AccountsSeedService(FuzulEvDbContext dbContext, SeedData seedData)
            : base(dbContext)
        {
            _seedData = seedData;
        }

        public async override Task Execute(CancellationToken cancellationToken)
        {
            foreach (var accountData in _seedData.Accounts)
            {
                var account = new Account(accountData.Id);

                await _dbContext.Accounts.AddAsync(account, cancellationToken);
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
