using FuzulEv.Domains.Base;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Pluralize.NET;

namespace FuzulEv.DataAccess.EntityConfigurations
{
    internal class BaseEntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity>
        where TEntity : BaseEntity
    {
        private readonly IPluralize _pluralizer;

        public BaseEntityConfiguration()
        {
            _pluralizer = new Pluralizer();
        }

        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(x => x.DeletedAt == null);

            builder.ToTable(_pluralizer.Pluralize(typeof(TEntity).Name), config =>
            {
                config.IsTemporal();
            });
        }
    }
}
