using FuzulEv.DataAccess.Context;
using FuzulEv.Domains.Models.AccountDomain;

using Microsoft.EntityFrameworkCore;

namespace FuzulEv.DataAccess.Repositories.AccountDomain
{
    public interface IAccountRepository : IBaseRepository<Account>
    {
        Task<Account?> GetByIdAsync(string id, CancellationToken cancellationToken);
    }

    internal class AccountRepository : BaseRepository<Account>, IAccountRepository
    {
        public AccountRepository(FuzulEvDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Account?> GetByIdAsync(string id, CancellationToken cancellationToken)
        {
            var accounts = _baseDb.Accounts;

            return await accounts.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }
    }
}
