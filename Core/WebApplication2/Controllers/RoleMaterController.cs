using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
//using Microsoft.IdentityModel.Tokens;
//using Models.Request;
//using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
                //Console.WriteLine($"Error:{ex.Message}");
                return new List<RoleType>();
            }
            //return new string[] { "value1", "value2" };
        }


        // GET api/<ValuesController>/5
        [HttpGet("GetRoleTypes/{id}")]
        public async Task<RoleMaster> Get(int id)
        {
            RoleMaster roleMaster = new RoleMaster();

            //List<RoleMaster> lstroleMaster = new List<RoleMaster>();

            //lstroleMaster.Add(new RoleMaster { Id = 1,Name="Role1" });
            //lstroleMaster.Add(new RoleMaster { Id = 2, Name = "Role2" });
            //lstroleMaster.Add(new RoleMaster { Id = 3 , Name = "Role3" });

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
                    //CompanyDetails companyDetails = await _dBHelperRepo.GetCompanyDetails(userMaster.ID);
                    //roleMaster.ErrorInfo = ReturnError(0, string.Empty);
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
                //Console.WriteLine($"Error:{ex.Message}");
                //return new List<RoleType>();
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
                //JsonObject obj = JsonNode.Parse(role).AsObject();
                int roletype = Convert.ToInt32(role["roleid"].ToString()); // (int)role["roleid"];
                string roleName = (string)role["name"];
<<<<<<< HEAD
                int createdBy = Convert.ToInt32(role["createdBy"].ToString());
                roleMaster = await _dBHelperRepo.CreateRole(2, roleName, roletype, createdBy);
=======
                //string CURRENT_DATE = (string)role["CreatedDate"];
                //roleMaster = await _dBHelperRepo.CreateRole(2,roleName,roletype);
                roleMaster = await _dBHelperRepo.CreateRole(2, roleName, roletype,  42);
>>>>>>> f22db514359c0218a4c5fb8afa48b86155668e1c

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

        // DELETE api/<ValuesController>/5
        [HttpPost("DeleteRoleMaster")]
        public async Task<RoleMasterData> DeleteRole([FromBody] JsonArray usr)
        {

            RoleMasterData roleMaster = new RoleMasterData();
            int id = (int)usr[1];
<<<<<<< HEAD
            //int LastModifiedById = (int)usr[0];
            int LastModifiedById = Convert.ToInt32(usr[0].ToString());
            int flag = (int)usr[2];
=======
            int LastModifiedById = (int)usr[0]; 
>>>>>>> f22db514359c0218a4c5fb8afa48b86155668e1c
            try
            {
                roleMaster = await _dBHelperRepo.DeleteRole(4,LastModifiedById, id);   //1 is the dummy data for lastModified field                
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

            //lstroleMaster.Add(new RoleMaster { Id = 1, Name = "Role1" });
            //lstroleMaster.Add(new RoleMaster { Id = 2, Name = "Role2" });
            //lstroleMaster.Add(new RoleMaster { Id = 3, Name = "Role3" });
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
<<<<<<< HEAD
                int lastModifier = Convert.ToInt32(user["lastModifier"].ToString());

                rolemasterdata = await _dBHelperRepo.UpdateRoleData(3, roleName, roletype, cb_pk_id, lastModifier);
=======
                //int lastModifiedBy = Convert.ToInt32(user["LastModifiedById"].ToString());
                rolemasterdata = await _dBHelperRepo.UpdateRoleData(3, roleName, roletype, cb_pk_id, 42);
>>>>>>> f22db514359c0218a4c5fb8afa48b86155668e1c
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

