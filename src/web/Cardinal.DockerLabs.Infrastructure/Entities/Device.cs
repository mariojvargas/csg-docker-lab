using System.ComponentModel.DataAnnotations;

namespace Cardinal.DockerLabs.Infrastructure.Entities 
{
    public class Device
    {
        public int Id { get; set; }

        [StringLength(128)]
        public string Name { get; set; }
        public virtual Manufacturer Manufacturer {get; set;}
        public int ManufacturerId { get; set; }
    }
}

