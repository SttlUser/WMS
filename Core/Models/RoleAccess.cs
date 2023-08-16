using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Models
{
    public class RoleAccess
    {
        public int id { get; set; }
        public int roleid { get; set; }
        public int documentid { get; set; }
        public string documentmasterfield { get; set; }
        public string rolename { get; set; }
        public int createdby { get; set; }
        public string createddate { get; set; }
        public int ParentId { get; set; }
        public List<SelectListItem> ParentChildData { get; set; }
        public bool flag { get; set; }
        public Error Error { get; set; }

       
    }
}
