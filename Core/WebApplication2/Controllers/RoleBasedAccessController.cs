using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Repositories;
using System;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;

=======
using Microsoft.Extensions.Options;
using Models;
using Repositories;
>>>>>>> f22db514359c0218a4c5fb8afa48b86155668e1c

namespace WebApplication2.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class RoleBasedAccessController
    {
        private readonly IDBHelperRepo _dBHelperRepo;
        private readonly AppSettings _appSettings = null;
        public RoleBasedAccessController(IOptions<AppSettings> appSettings, IDBHelperRepo dBHelperRepo)
        {
            _dBHelperRepo = dBHelperRepo;
            _dBHelperRepo.AppSettings = appSettings.Value;
            _appSettings = appSettings.Value;
        }
        [HttpGet("GetRoleBasedAccessData")]
<<<<<<< HEAD
        public async Task<List<RoleAccess>> Get(int flag,int roleid)
        {
            List<RoleAccess> roleAccess = new List<RoleAccess>();
            try
            {
                roleAccess = await _dBHelperRepo.GetRoleBasedAccess(1,roleid);                
            }
            catch (Exception)
            {
               // roleAccess.Error = ReturnError(400, string.Empty);
            }
            return roleAccess;
        }

        [HttpPost("UpdateRoleAccessData")]
        public async Task<UpdateRoleAccess> Update([FromBody] JsonObject user)
            {
            UpdateRoleAccess roleAccess = new UpdateRoleAccess();
            List<int> documentIds = new List<int>();

            try
            {
                int roleid = Convert.ToInt32(user["roleid"].ToString());
                JArray documentIdArray = JsonConvert.DeserializeObject<JArray>(user["Documentid"].ToString());
                documentIds = documentIdArray.ToObject<List<int>>();
                roleAccess = await _dBHelperRepo.UpdateRoleAccess(2, roleid, documentIds);
            }
            catch (Exception e) 
            {
                Console.WriteLine(e);
            }
            return roleAccess;
        }

        private Error ReturnError(int code, string strError)
        {
            return new Error()
            {
                code = code,
                message = strError
            };
        }


=======
        public async Task<List<RoleMasterData>> Get()
        {
            try
            {
                List<RoleMasterData> roleBsed = await _dBHelperRepo.GetRoleBasedAccess(1);
                return roleBsed;
            }
            catch (Exception)
            {
                return new List<RoleMasterData>();
            }
        }

        
>>>>>>> f22db514359c0218a4c5fb8afa48b86155668e1c

    }
}
