using AutoMapper;
using DAL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class FlightMappingProfile : Profile
    {
        public FlightMappingProfile()
        {
            // Create mappings between Flight and FlightDto
            CreateMap<Flight, FlightDTO>();
            CreateMap<FlightDTO, Flight>();
        }
    }
}
