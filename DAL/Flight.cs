using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public enum EStatus { hanger, airborne, malfunction }
    public class Flight
    {
        public int Id { get; set; }
        public string FlightNumber { get; set; }
        public Airport LandingAirport { get; set; }
        public Airport TakeOffAirport { get; set; }
        public EStatus Status { get; set; }
        public string TakeOffTime { get; set; }
        public string LandingTime { get; set; }
    }
}

