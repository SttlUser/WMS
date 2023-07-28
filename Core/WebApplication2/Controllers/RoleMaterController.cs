using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;

namespace WebApplication2.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class RoleMaterController
    {
        private readonly IDBHelperRepo _dBHelperRepo;
        private readonly AppSettings _appSettings = null;
        // GET: api/<ValuesController>
        public RoleMaterController(IOptions<AppSettings> appSettings, IDBHelperRepo dBHelperRepo)
        {
            _dBHelperRepo = dBHelperRepo;
            _dBHelperRepo.AppSettings = appSettings.Value;
            _appSettings = appSettings.Value;
        }
        [HttpGet("GetRoleTypes")]
        public async Task<List<RoleType>> Get()
        {
            try
            {
                List<RoleType> roleType = await _dBHelperRepo.GetRoleType();

                return roleType;
            }
            catch (Exception)
            {
                return new List<RoleType>();
            }
        }


        // GET api/<ValuesController>/5
        [HttpGet("GetRoleTypes/{id}")]
        public async Task<RoleMaster> Get(int id)
        {
            RoleMaster roleMaster = new RoleMaster();

            

            try
            {
                RoleType roleType = await _dBHelperRepo.GetRoleTypeById(id);
                if (roleType == null)
                {
                    roleMaster.Id = 0;
                    roleMaster.Name = "";
                    roleMaster.Error = ReturnError(404, "Data Not Found");
                }
                else
                {
                    roleMaster.Id = roleType.Id;
                    roleMaster.Name = roleType.Name;
                    roleMaster.Error = ReturnError(0, string.Empty);
                }
            }
            catch (Exception ex)
            {
                roleMaster.Id = 0;
                roleMaster.Name = "";
                roleMaster.Error = ReturnError(404, ex.Message);
            }
            return roleMaster;
        }

        // POST api/<ValuesController>
        [HttpPost("CreateRole")]
        public async Task<RoleMasterData> Post([FromBody] JsonObject role)
        {
            RoleMasterData roleMaster = new RoleMasterData();
            try
            {
                int roletype = Convert.ToInt32(role["roleid"].ToString()); // (int)role["roleid"];
                string roleName = (string)role["name"];
                int createdBy = Convert.ToInt32(role["createdBy"].ToString());
                roleMaster = await _dBHelperRepo.CreateRole(2, roleName, roletype, createdBy);

                roleMaster.Error = ReturnError(0, string.Empty);
            }
            catch (Exception ex)
            {
                roleMaster.Error = ReturnError(400, ex.ToString());
            }
            return roleMaster;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpPost("DeleteRoleMaster")]
        public async Task<RoleMasterData> DeleteRole([FromBody] JsonArray usr)
        {

            RoleMasterData roleMaster = new RoleMasterData();
            int id = (int)usr[1];
            //int LastModifiedById = (int)usr[0];
            int LastModifiedById = Convert.ToInt32(usr[0].ToString());
            int flag = (int)usr[2];
            try
            {
                roleMaster = await _dBHelperRepo.DeleteRole(flag,LastModifiedById, id);   //1 is the dummy data for lastModified field                
            }
            catch (Exception ex)
            {                
                roleMaster.Error = ReturnError(404, ex.Message);              
            }
            return roleMaster;

        }


        [HttpGet("GetRoleMasterData")]
        public async Task<List<RoleMasterData>> GetAllRoleMaster(int flag)
        {
            List<RoleMasterData> lstroleMaster = new List<RoleMasterData>();

       
            try
            {
                lstroleMaster = await _dBHelperRepo.GetAllRoleMaster(flag);
            }
            catch  (Exception ex){
            }
            return lstroleMaster;
        }

        [HttpPut("UpdateRoleMaster")]
        public async Task<RoleMasterData> UpdateRoleMaster([FromBody] JsonObject user)
        {
            RoleMasterData rolemasterdata = new RoleMasterData();
            try
            {
                string roleName = (string)user["Name"];
                int roletype = Convert.ToInt32(user["RoleTypeid"].ToString());
                int cb_pk_id = Convert.ToInt32(user["Id"].ToString());
                int lastModifier = Convert.ToInt32(user["lastModifier"].ToString());

                rolemasterdata = await _dBHelperRepo.UpdateRoleData(3, roleName, roletype, cb_pk_id, lastModifier);
                rolemasterdata.Error = ReturnError(0, string.Empty);
            }
            catch (Exception ex)
            {
                rolemasterdata.Error = ReturnError(400, ex.ToString());
            }
            return rolemasterdata;
        }


        private Error ReturnError(int code, string strError)
        {
            return new Error()
            {
                code = code,
                message = strError
            };
        }
    }
}

