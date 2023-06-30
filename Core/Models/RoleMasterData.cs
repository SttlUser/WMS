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
        public int CreatedBy { get; set; }
        public string LastModifiedDate { get; set;}
        public int LastModifiedBy { get; set; }
        public string isActive { get; set; }
        public string CreatedByName { get; set; }
        public string LastModifiedByName { get; set; }
        public string RoleName { get; set; }
        public Error Error { get; set; }

    }
}
