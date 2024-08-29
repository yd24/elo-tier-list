using Microsoft.EntityFrameworkCore;
using RankingAPI.Models;

namespace RankingAPI.Data
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options)
        {

        }

        public DbSet<Item> Items => Set<Item>();
    }
}