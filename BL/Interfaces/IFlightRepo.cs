using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IFlightRepo
    {
        public Task<List<FlightDTO>> getFlights();
        public Task<FlightDTO> addFlight(FlightDTO flightDTO);

        public Task<FlightDTO> editFlight(FlightDTO flightDTO);

        public Task<List<AirportDTO>> getAirPorts();

        public  Task<FlightDTO> getFlightById(string id);
    }
}
