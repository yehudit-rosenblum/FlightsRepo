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

        public async Task<List<FlightDTO>> getFlights()
        {
            var result = await _context.Flights.AsNoTracking().Include(f => f.LandingAirport)
                                               .Include(f => f.TakeOffAirport)
                                               .ToListAsync();
            return _mapper.Map<List<FlightDTO>>(result);
        }

        public async Task<FlightDTO> getFlightById(string id)
        {
            var result = await _context.Flights.AsNoTracking().Include(f => f.LandingAirport)
                                               .Include(f => f.TakeOffAirport)
                                               .Where(f => f.FlightNumber == id)
                                               .FirstOrDefaultAsync();
            return _mapper.Map<FlightDTO>(result);
        }


        public async Task<List<AirportDTO>> getAirPorts()
        {
            var result = await _context.Airports.ToListAsync();
                return _mapper.Map<List<AirportDTO>>(result);
        }





        public async Task<FlightDTO> addFlight(FlightDTO flightDTO)
        {
            try
            {
                // יצירת ישות טיסה חדשה עם מזהי שדות התעופה
                Flight newFlight = _mapper.Map<FlightDTO, Flight>(flightDTO);

                // הגדרת ישות שדה תעופה קיימת לפי מזהה בלבד
                newFlight.TakeOffAirport = new Airport { Id = flightDTO.TakeOffAirport.Id };
                newFlight.LandingAirport = new Airport { Id = flightDTO.LandingAirport.Id };

                // הוספת ישות הטיסה החדשה
                _context.Flights.Attach(newFlight);
                _context.Entry(newFlight.TakeOffAirport).State = EntityState.Unchanged;
                _context.Entry(newFlight.LandingAirport).State = EntityState.Unchanged;

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

      


        public async Task<FlightDTO> editFlight(FlightDTO flightDTO)
        {
            // Find the existing flight by flight number
            var existingFlight = await _context.Flights
                .Include(f => f.LandingAirport)
                .Include(f => f.TakeOffAirport)
                .FirstOrDefaultAsync(f => f.FlightNumber == flightDTO.FlightNumber);

            if (existingFlight == null)
            {
                throw new Exception("Flight not found");
            }

            // Map the new data to the existing flight
            _mapper.Map(flightDTO, existingFlight);

            // Only update the airports if they have changed
            if (existingFlight.TakeOffAirport.Id != flightDTO.TakeOffAirport.Id)
            {
                var takeOffAirport = await _context.Airports.FindAsync(flightDTO.TakeOffAirport.Id);
                if (takeOffAirport != null)
                {
                    existingFlight.TakeOffAirport = takeOffAirport;
                }
            }

            if (existingFlight.LandingAirport.Id != flightDTO.LandingAirport.Id)
            {
                var landingAirport = await _context.Airports.FindAsync(flightDTO.LandingAirport.Id);
                if (landingAirport != null)
                {
                    existingFlight.LandingAirport = landingAirport;
                }
            }

            // Update the flight in the database
            _context.Flights.Update(existingFlight);
            await _context.SaveChangesAsync();

            return _mapper.Map<Flight, FlightDTO>(existingFlight);
        }


    }
}




