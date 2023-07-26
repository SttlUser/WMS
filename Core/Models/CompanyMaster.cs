using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class CompanyMaster
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SLUrl { get; set; }
        public string slusername { get;set; }
        public string SLPassword { get; set; }
        public int Lastmodifiedby { get; set;}
        public string? phone { get; set; }
        public string email { get; set; }
        public string DatabaseType { get; set; }
        public List<DBNames> DbName { get; set; }//list
        public int comp_id { get; set; }    
        public bool hasPutAwayProc { get; set; }
        public bool hasSsccNoManagement { get; set; }
        public bool hasCartonNoManagement { get; set; }
        public bool hasAutoBatchConfigurator { get; set; }
        public int defaultWarehouseCode { get; set; }
        public bool IsActive { get; set; }  
        public bool IsDelete { get; set; }
        public string DeletedDate { get; set; }
        public int DeletedBy { get; set; }
        public  string CreatedDate { get; set; }    
        public int CreatedBy { get; set; }
        public string LastModifiedDate { get; set; }
        public string SLDBName { get; set; }
        public string SAPCompanyName { get; set; }
        public bool Flag { get; set; }

        public Error? Error { get; set; }
    }

    public class GetCompanyMaster
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SLUrl { get; set; }
        public string slusername { get; set; }
        public string SLPassword { get; set; }
        public int Lastmodifiedby { get; set; }
        public string? phone { get; set; }
        public string email { get; set; }
        public string db_type { get; set; }
        public string sapcompanyname { get; set; }
        public string SLDbName { get; set; }
        public int CompanyID { get; set; }
        public bool hasPutAwayProc { get; set; }
        public bool hasSsccNoManagement { get; set; }
        public bool hasCartonNoManagement { get; set; }
        public bool hasAutoBatchConfigurator { get; set; }
        public int defaultWarehouseCode { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public string DeletedDate { get; set; }
        public int DeletedBy { get; set; }
        public string CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public string LastModifiedDate { get; set; }
     

        public Error Error { get; set; }
    }

    public class DBNames
    {
           public string DBName { get; set; }
           public string SAPCompanyName { get; set; }
           public bool Flag { get; set; }
    }
}
