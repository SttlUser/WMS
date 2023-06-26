using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class RoleMaster
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string createdBy { get; set; }
        public Error Error{ get; set; }
    }
}