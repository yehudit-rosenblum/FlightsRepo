using BL.Interfaces;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlightsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        IFlightRepo _flightRepo;
        public FlightController(IFlightRepo flightRepo)
        {
            _flightRepo = flightRepo;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> GetFlights()
        {
            var flightDtos =_flightRepo.GetAll() ;
            return Ok(flightDtos);
        }



        public async Task<List<FlightDTO>> Add(FlightDTO flightDTO)
        {
            throw new NotImplementedException();
        }

        public async Task<List<FlightDTO>> Edit(FlightDTO flightDTO)
        {
            throw new NotImplementedException();
        }
    }
}
