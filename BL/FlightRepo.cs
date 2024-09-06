using AutoMapper;
using BL.Interfaces;
using DAL;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class FlightRepo : IFlightRepo
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;


        public FlightRepo(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<FlightDTO>> GetAll()
        {
            var result = await _context.Flights.ToListAsync();
            return _mapper.Map<List<FlightDTO>>(result);

        }
        //public async Task<List<FlightDTO>> Add(FlightDTO flightDTO)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task<List<FlightDTO>> Edit(FlightDTO flightDTO)
        //{
        //    throw new NotImplementedException();
        //}

     

    
    }
}
