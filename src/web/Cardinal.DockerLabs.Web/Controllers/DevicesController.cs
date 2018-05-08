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
    public class DevicesController : Controller
    {
        private readonly SmartHomeDbContext _dataContext;

        public DevicesController(SmartHomeDbContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        [HttpGet]
        public IActionResult GetDevices()
        {
            var devices = _dataContext.Devices
                .OrderBy(device => device.Manufacturer.Name)
                .ThenBy(device => device.Name)
                .ProjectTo<DeviceDto>()
                .ToList();

            return Ok(devices);
        }

        [HttpGet("{id}")]
        public IActionResult GetDevice(int id) 
        {
            var device = _dataContext.Devices
                .Include(d => d.Manufacturer)
                .SingleOrDefault(d => d.Id == id);

            if (device == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<DeviceDto>(device));
        }
    }
}
