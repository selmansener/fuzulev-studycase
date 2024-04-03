using FuzulEv.Domains.Models.AccountDomain;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuzulEv.DataAccess.EntityConfigurations.AccountDomain
{
    internal class AccountEntityConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasQueryFilter(x => x.DeletedAt == null);

            builder.ToTable($"{nameof(Account)}s", tableBuilder =>
            {
                tableBuilder.IsTemporal();
            });
        }
    }
}
