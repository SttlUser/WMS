using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Error
    {
        public int code { get; set; }
        public string message { get; set; }
        
    }
    public class Message
    {
        public string lang { get; set; }
        public string value { get; set; }
    }
}
