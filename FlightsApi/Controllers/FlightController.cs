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

        [HttpGet("getFlights")]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> getFlights()
        {
            var flightDtos =await _flightRepo.getFlights();
            return Ok(flightDtos);
        }

        [HttpPost("addFlight")]
        public async Task<ActionResult<FlightDTO>> addFlight([FromBody] FlightDTO flightDto)
        {
            await _flightRepo.addFlight(flightDto);
            return Ok(flightDto);


        }


       

        [HttpPut("editFlight/{id}")]
        public async Task<ActionResult<FlightDTO>> editFlight(string id, [FromBody] FlightDTO flightDto)
        {
            if (id != flightDto.FlightNumber)
            {
                return BadRequest("Flight ID mismatch");
            }

            try
            {
                await _flightRepo.editFlight(flightDto);
                return Ok(flightDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }






        [HttpGet("getAirPorts")]
        public async Task<ActionResult<IEnumerable<AirportDTO>>> getAirPorts()
        {
            var airPortDtos = await _flightRepo.getAirPorts();
            return Ok(airPortDtos);
        }

    }
}
