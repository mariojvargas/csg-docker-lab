using System;
using System.Linq;
using Cardinal.DockerLabs.Infrastructure.Entities;

namespace Cardinal.DockerLabs.Infrastructure.Database
{
    public static class SmartHomeDbContextInitializer
    {
        public static void SeedDatabase(SmartHomeDbContext context)
        {
            context.Database.EnsureCreated();

            SeedManufacturers(context);
            SeedDevices(context);
        }

        private static void SeedManufacturers(SmartHomeDbContext context)
        {
            if (context.Manufacturers.Any())
            {
                return;
            }

            context.Manufacturers.AddRange(
                new Manufacturer
                {
                    Name = "Microsoft"
                },
                new Manufacturer
                {
                    Name = "Apple"
                }
            );

            context.SaveChanges();
        }

        public static void SeedDevices(SmartHomeDbContext context)
        {
            if (context.Devices.Any())
            {
                return;
            }

            const int deviceCountPerManufacturer = 10;

            foreach (var manufacturer in context.Manufacturers)
            {
                var devices = Enumerable.Range(1, deviceCountPerManufacturer)
                    .Select(n => new Device
                    {
                        Name = $"{manufacturer.Name} Device {n}",
                        Manufacturer = manufacturer
                    });
                context.AddRange(devices);
            }

            context.SaveChanges();
        }
    }
}