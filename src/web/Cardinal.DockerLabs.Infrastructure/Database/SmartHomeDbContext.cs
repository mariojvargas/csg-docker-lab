using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Cardinal.DockerLabs.Infrastructure.Entities;

namespace Cardinal.DockerLabs.Infrastructure.Database
{
    public class SmartHomeDbContext : DbContext
    {
        public SmartHomeDbContext(DbContextOptions<SmartHomeDbContext> options): base(options)
        {
        }

        public DbSet<Device> Devices { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
    }
}
