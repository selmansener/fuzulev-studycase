namespace FuzulEv.Business.DTOs
{
    public class PaginationDTO<TData>
        where TData : class
    {
        public IEnumerable<TData> Data { get; set; }

        public int TotalRowCount { get; set; }
    }
}
