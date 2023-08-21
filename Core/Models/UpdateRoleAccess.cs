using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class UpdateRoleAccess
    {
        public int roleid { get; set; }
        public List<int> documentid { get; set; }   
        //public List<RoleAccess> RoleDocuments { get; set; }
    }
}
