using AutoMapper;
using Cardinal.DockerLabs.Infrastructure.Entities;

namespace Cardinal.DockerLabs.Web.Models.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Manufacturer, ManufacturerDto>();

            CreateMap<Device, DeviceDto>()
                .ForMember(
                    destination => destination.ManufacturerName, 
                    options => options.MapFrom(source => source.Manufacturer.Name)
                );
        }
    }
}