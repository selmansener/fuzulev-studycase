using FuzulEv.Domains.Base;

namespace FuzulEv.Domains.Models.AccountDomain
{
    public class Account : BaseEntity
    {
        public Account(string id)
        {
            Id = id;
            CreatedAt = DateTime.UtcNow;
        }

        public new string Id { get; private set; }
    }
}
