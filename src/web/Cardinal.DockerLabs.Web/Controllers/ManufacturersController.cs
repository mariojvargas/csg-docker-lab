using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cardinal.DockerLabs.Infrastructure.Database;
using Cardinal.DockerLabs.Web.Models.Dtos;

namespace Cardinal.DockerLabs.Web.Controllers
{
    [Route("api/[controller]")]
    public class ManufacturersController : Controller
    {
        private readonly SmartHomeDbContext _dataContext;

        public ManufacturersController(SmartHomeDbContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        [HttpGet]
        public IActionResult GetManufacturers()
        {
            var manufacturers = _dataContext.Manufacturers
                .ProjectTo<ManufacturerDto>()
                .ToList();

            return Ok(manufacturers);
        }

        [HttpGet("{manufacturerName:alpha}")]
        public IActionResult GetManufacturerDetail(string manufacturerName)
        {
            var manufacturer = _dataContext.Manufacturers
                .SingleOrDefault(m => m.Name == manufacturerName);

            if (manufacturer == null)
            {
                return NotFound();
            }


            return Ok(Mapper.Map<ManufacturerDto>(manufacturer));
        }

        [HttpGet("{manufacturerName:alpha}/devices")]
        public IActionResult GetDevicesByManufacturer(string manufacturerName)
        {
            var manufacturer = _dataContext.Manufacturers.SingleOrDefault(m => m.Name == manufacturerName);

            if (manufacturer == null)
            {
                return NotFound();
            }

            var devices = _dataContext.Devices
                .Where(device => device.ManufacturerId == manufacturer.Id)
                .ProjectTo<DeviceDto>()
                .ToList();
                
            return Ok(devices);
        }
    }
}
