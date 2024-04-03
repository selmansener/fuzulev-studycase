using System.Collections.Immutable;

using FuzulEv.Domains.Models.AccountDomain;

namespace FuzulEv.Business.Seed.Data
{
    internal class SeedData
    {
        public ImmutableList<Account> Accounts { get; private set; }
    }
}
