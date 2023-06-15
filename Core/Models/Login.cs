using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class LoginResponse
    {
        public Error ErrorInfo { get; set; }
    }
}
