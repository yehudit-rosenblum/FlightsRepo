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
            var result = await _context.Flights.Include(f => f.LandingAirport)
                                               .Include(f => f.TakeOffAirport)
                                               .ToListAsync();
            return _mapper.Map<List<FlightDTO>>(result);
        }


        public async Task<List<AirportDTO>> getAirPorts()
        {
            var result = await _context.Airports.ToListAsync();
                return _mapper.Map<List<AirportDTO>>(result);
        }




        //public async Task<FlightDTO> addFlight(FlightDTO flightDTO)
        //{
        //    try
        //    {
                
        //        Flight newFlight = _mapper.Map<FlightDTO, Flight>(flightDTO);
        //        await _context.Flights.AddAsync(newFlight);
        //        await _context.SaveChangesAsync();
        //        return _mapper.Map<Flight, FlightDTO>(newFlight);
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        Console.WriteLine("Error occurred while saving changes: " + ex.InnerException?.Message);
        //        throw;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("General error: " + ex.Message);
        //        throw;
        //    }
        //}


        public async Task<FlightDTO> addFlight(FlightDTO flightDTO)
{
    try
    {
        // אחזר את שדות התעופה הקיימים מה-DB לפי מזהה
        var takeOffAirport = await _context.Airports
            .FirstOrDefaultAsync(a => a.Id == flightDTO.TakeOffAirport.Id);
        var landingAirport = await _context.Airports
            .FirstOrDefaultAsync(a => a.Id == flightDTO.LandingAirport.Id);

        if (takeOffAirport == null || landingAirport == null)
        {
            throw new Exception("One or both airports not found");
        }

        // יצירת ישות טיסה חדשה עם שדות התעופה הקיימים
        Flight newFlight = _mapper.Map<FlightDTO, Flight>(flightDTO);
        newFlight.TakeOffAirport = takeOffAirport;
        newFlight.LandingAirport = landingAirport;

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
            // מציאת הטיסה הקיימת על פי מספר הטיסה
            var existingFlight = await _context.Flights
                .Include(f => f.LandingAirport)
                .Include(f => f.TakeOffAirport)
                .FirstOrDefaultAsync(f => f.FlightNumber == flightDTO.FlightNumber);

            if (existingFlight == null)
            {
                throw new Exception("Flight not found");
            }

            // אחזר את שדות התעופה הקיימים מה-DB לפי מזהה
            var takeOffAirport = await _context.Airports
                .FirstOrDefaultAsync(a => a.Id == flightDTO.TakeOffAirport.Id);
            var landingAirport = await _context.Airports
                .FirstOrDefaultAsync(a => a.Id == flightDTO.LandingAirport.Id);

            if (takeOffAirport == null || landingAirport == null)
            {
                throw new Exception("One or both airports not found");
            }

            // מיפוי הנתונים החדשים לטיסה הקיימת
            _mapper.Map(flightDTO, existingFlight);

            // שימוש בשדות התעופה הקיימים
            existingFlight.TakeOffAirport = takeOffAirport;
            existingFlight.LandingAirport = landingAirport;

            // עדכון הנתונים בבסיס הנתונים
            _context.Flights.Update(existingFlight);
            await _context.SaveChangesAsync();

            return _mapper.Map<Flight, FlightDTO>(existingFlight);
        }


        //public async Task<FlightDTO> editFlight(FlightDTO flightDTO)
        //{
        //    // מציאת הטיסה הקיימת על פי ה-Id
        //    var existingFlight = await _context.Flights.Where(f=>f.FlightNumber==flightDTO.FlightNumber).FirstAsync();

        //    if (existingFlight == null)
        //    {
        //        // במקרה שהטיסה לא נמצאה
        //        throw new Exception("Flight not found");
        //    }

        //    // מיפוי הנתונים החדשים מה-DTO לאובייקט הטיסה הקיים
        //    _mapper.Map(flightDTO, existingFlight);

        //    // עדכון הנתונים בבסיס הנתונים
        //    _context.Flights.Update(existingFlight);
        //    await _context.SaveChangesAsync();

        //    // החזרת ה-DTO המעודכן
        //    return _mapper.Map<Flight, FlightDTO>(existingFlight);
        //}

    }
}




