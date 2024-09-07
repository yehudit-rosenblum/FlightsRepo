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

        //public async Task<List<FlightDTO>> GetAll()
        //{
        //    var result = await _context.Flights.ToListAsync();
        //    return _mapper.Map<List<FlightDTO>>(result);

        //}

        public async Task<List<FlightDTO>> GetAll()
        {
            var result = await _context.Flights.Include(f => f.LandingAirport)
                                               .Include(f => f.TakeOffAirport)
                                               .ToListAsync();
            return _mapper.Map<List<FlightDTO>>(result);
        }



        //public async Task<FlightDTO> Add(FlightDTO flightDTO)
        //{
        //    Flight newFlight = _mapper.Map<FlightDTO, Flight>(flightDTO);
        //    await _context.Flights.AddAsync(newFlight);
        //     _context.SaveChangesAsync();

        //    Flight f = _context.Flights.FirstOrDefault(f =>
        //    f.FlightNumber == flightDTO.FlightNumber &&
        //    f.LandingAirport == newFlight.LandingAirport &&
        //    f.TakeOffAirport == newFlight.TakeOffAirport &&
        //    f.Status == newFlight.Status &&
        //    f.TakeOffTime == flightDTO.TakeOffTime &&
        //    f.LandingTime == flightDTO.LandingTime);
        //    return _mapper.Map<Flight, FlightDTO>(f);
        //}


        public async Task<FlightDTO> Add(FlightDTO flightDTO)
        {
            try
            {
                
                Flight newFlight = _mapper.Map<FlightDTO, Flight>(flightDTO);
                await _context.Flights.AddAsync(newFlight);
                await _context.SaveChangesAsync();
                return _mapper.Map<Flight, FlightDTO>(newFlight);
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine("Error occurred while saving changes: " + ex.InnerException?.Message);
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine("General error: " + ex.Message);
                throw;
            }
        }



        //public async Task<FlightDTO> Edit(FlightDTO flightDTO)
        //{
        //    // מציאת הטיסה הקיימת על פי ה-Id
        //    var existingFlight = await _context.Flights.FindAsync(flightDTO.Id);

        //    if (existingFlight == null)
        //    {
        //        // מיפוי הנתונים החדשים מה-DTO לאובייקט הטיסה הקיים
        //        _mapper.Map(flightDTO, existingFlight);

        //        // עדכון הנתונים בבסיס הנתונים
        //        _context.Flights.Update(existingFlight);
        //        await _context.SaveChangesAsync();

        //        // החזרת הטיסה המעודכנת כ-DTO
        //        return _mapper.Map<Flight, FlightDTO>(existingFlight);
        //    }
        //}


    }
}
