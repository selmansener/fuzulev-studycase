namespace FuzulEv.Domains.Base
{
    public interface IBaseEntity { }

    public abstract class BaseEntity : IBaseEntity
    {
        protected BaseEntity()
        {
            CreatedAt = DateTime.UtcNow;
        }

        public int Id { get; }

        public DateTime? DeletedAt { get; protected set; }

        public DateTime? UpdatedAt { get; protected set; }

        public DateTime CreatedAt { get; protected set; }

        public int? DeletedById { get; protected set; }

        public int? UpdatedById { get; protected set; }

        public int CreatedById { get; protected set; }

        public int Version { get; protected set; }

        public virtual void Created(int createdById)
        {
            CreatedById = createdById;
        }

        public virtual void Updated(int? updatedById)
        {
            UpdatedAt = DateTime.UtcNow;
            UpdatedById = updatedById;
            Version++;
        }

        public virtual void Deleted(int deletedById)
        {
            DeletedAt = DateTime.UtcNow;
            DeletedById = deletedById;
            Version++;
        }
    }
}
