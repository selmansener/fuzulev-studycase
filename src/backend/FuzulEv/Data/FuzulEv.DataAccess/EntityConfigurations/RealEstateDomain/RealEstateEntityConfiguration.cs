using FuzulEv.Domains.Models.RealEstateDomain;

using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace FuzulEv.DataAccess.EntityConfigurations.RealEstateDomain
{
    internal class RealEstateEntityConfiguration : BaseEntityConfiguration<RealEstate>
    {
        public override void Configure(EntityTypeBuilder<RealEstate> builder)
        {
            base.Configure(builder);

            builder.HasOne(x => x.Location)
                .WithMany(x => x.RealEstates)
                .IsRequired()
                .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
        }
    }
}
