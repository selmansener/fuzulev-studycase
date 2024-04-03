using FuzulEv.Domains.Models.LocationDomain;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FuzulEv.DataAccess.EntityConfigurations.LocationDomain
{
    internal class LocationEntityConfiguration : BaseEntityConfiguration<Location>
    {
        public override void Configure(EntityTypeBuilder<Location> builder)
        {
            base.Configure(builder);

            builder.HasIndex(x => new { x.City, x.District, x.DeletedAt })
                .IsUnique()
                .IsClustered(false);
        }
    }
}
