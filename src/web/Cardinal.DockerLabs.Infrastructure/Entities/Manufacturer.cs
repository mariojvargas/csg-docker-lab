using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cardinal.DockerLabs.Infrastructure.Entities
{
    public class Manufacturer
    {
        public int Id { get; set; }

        [StringLength(128)]
        public string Name { get; set; }

        public virtual ICollection<Device> Devices { get; set; }
    }
}