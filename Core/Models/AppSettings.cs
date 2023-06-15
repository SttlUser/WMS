using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class AppSettings
    {
       public ConnectionStrings ConnectionStrings { get; set; }


    }
    public class ConnectionStrings
    {
        public string PgDbConStr { get; set; }
    }
}