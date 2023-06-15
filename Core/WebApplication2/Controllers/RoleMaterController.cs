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
        public async Task<RoleMaster> Post([FromBody] JsonObject role)
        {
             RoleMaster roleMaster = new RoleMaster();
            try
            {
                //JsonObject obj = JsonNode.Parse(role).AsObject();
                int roleid = (int)role["roleid"];
                string name = (string)role["name"];
                roleMaster = await _dBHelperRepo.CreateRole(name, roleid, 1);
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
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
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
