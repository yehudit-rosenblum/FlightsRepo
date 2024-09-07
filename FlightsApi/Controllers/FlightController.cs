using BL.Interfaces;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace FlightsApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FlightController : ControllerBase
    {
        IFlightRepo _flightRepo;
        public FlightController(IFlightRepo flightRepo)
        {
            _flightRepo = flightRepo;
        }

        [HttpGet("GetFlights")]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> GetFlights()
        {
            var flightDtos =await _flightRepo.GetAll();
            return Ok(flightDtos);
        }

        [HttpPost("Add")]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> Add(FlightDTO flightDto)
        {
            await _flightRepo.Add(flightDto);
            return Ok(flightDto);


        }
        //public async Task<FlightDTO> Edit(FlightDTO flightDTO)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
