using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class RoleMasterData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoleTypeid { get; set; }
        public string CreatedDate { get; set; }
        public int LastModifier { get; set;}
        public Error Error { get; set; }

    }
}
