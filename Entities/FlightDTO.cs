using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class FlightDTO
    {
        public int Id { get; set; }
        public string FlightNumber { get; set; }
        public AirportDTO LandingAirport { get; set; }
        public AirportDTO TakeOffAirport { get; set; }
        public int Status { get; set; }
  
        public string TakeOffTime { get; set; }
        public string LandingTime { get; set; }
    }
}
