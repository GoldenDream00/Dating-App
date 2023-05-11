using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items, int count, int pageSize, int pageNumber)
        {
            CurrentPage = pageNumber;
            PageSize = pageSize;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize);
            TotalCount = count;
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, 
            int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T> (items, count, pageSize, pageNumber);
        }
    }
}