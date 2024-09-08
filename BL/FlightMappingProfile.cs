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
           
            CreateMap<Flight, FlightDTO>();
            CreateMap<FlightDTO, Flight>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Status , );


            CreateMap<Airport, AirportDTO>();
            CreateMap<AirportDTO, Airport>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));   

        }
    }
}


 

