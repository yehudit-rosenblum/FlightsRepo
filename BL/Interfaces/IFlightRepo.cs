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
        public Task<List<FlightDTO>> GetAll();
        public Task<List<FlightDTO>> Add(FlightDTO flightDTO);
        public Task<List<FlightDTO>> Edit(FlightDTO flightDTO);
    }
}
