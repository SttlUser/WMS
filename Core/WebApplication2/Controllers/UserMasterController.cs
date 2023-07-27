using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using Repositories;
using System.Text.Json.Nodes;

namespace WebApplication2.Controllers
{

     [Route("/[controller]")]
        [ApiController]
    public class UserMasterController
    {
        private readonly IDBHelperRepo _dBHelperRepo;
        private readonly AppSettings _appSettings = null;
        // GET: api/<ValuesController>
        public UserMasterController(IOptions<AppSettings> appSettings, IDBHelperRepo dBHelperRepo)
        {
            _dBHelperRepo = dBHelperRepo;
            _dBHelperRepo.AppSettings = appSettings.Value;
            _appSettings = appSettings.Value;
        }

        [HttpGet("GetUserMasterData")]
        public async Task<List<UserMaster>> GetAllUserMaster(int flag)
        {
            List<UserMaster> lstroleMaster = new List<UserMaster>();

           
            try
            {
                lstroleMaster = await _dBHelperRepo.GetAllUserMaster(1);
            }
            catch (Exception ex)
            {
            }
            return lstroleMaster;
        }

        [HttpPost("DeleteUserMaster")]
        public async Task<UserMaster> DeleteUser([FromBody] JsonArray usr)


        {
            int ins_del_id = (int)usr[0];
            int cb_pk_id = (int)usr[1];
            int flag = (int)usr[2];
            UserMaster userMaster = new UserMaster();
            try
            {
                 userMaster = await _dBHelperRepo.DeleteUser(flag, ins_del_id, cb_pk_id);   //1 is the dummy data for lastModified field                
            }
            catch (Exception ex)
            {
                userMaster.Error = ReturnError(404, ex.Message);
            }
            return userMaster;

        }
        private Error ReturnError(int code, string strError)
        {
            return new Error()
            {
                code = code,
                message = strError
            };
        }

        [HttpPost("CreateUser")]
        public async Task<UserMaster> Post([FromBody] JsonObject role)
        {
            UserMaster userMaster = new UserMaster();
            try
            {
                 int userid = Convert.ToInt32(role["cb_pk_id"].ToString()); // (int)role["roleid"];
                string firstname = (string)role["firstname"];

                string lastname = (string)role["lastname"];
                string username = (string)role["username"];

                string password = (string)role["password"];

                string email = (string)role["email"];

                string phone = (string)role["phone"];

                int ins_del_id = Convert.ToInt32(role["ins_del_id"].ToString());
                //int createdBy = Convert.ToInt32(role["createdBy"].ToString());

                userMaster = await _dBHelperRepo.CreateUser(2, firstname, lastname, username, password, email, phone, userid, ins_del_id);

                userMaster.Error = ReturnError(0, string.Empty);
            }
            catch (Exception ex)
            {
                userMaster.Error = ReturnError(400, ex.ToString());
            }
            return userMaster;
        }

        [HttpPut("UpdateUserMaster")]
        public async Task<UserMaster> UpatedUserMaster([FromBody] JsonObject user)
        {
            UserMaster userMaster = new UserMaster();
            try
            {
                int cb_pk_id = Convert.ToInt32(user["cb_pk_id"].ToString());
                string Firstname = (string)user["Firstname"];
                string Lastname = (string)user["Lastname"];
                string Password = (string)user["Password"];
                string Email = (string)user["Email"];
                string Phone = (string)user["Phone"];
                int ins_del_id = Convert.ToInt32(user["ins_del_id"].ToString());
                int lastModifier = Convert.ToInt32(user["lastModifier"].ToString());

                userMaster = await _dBHelperRepo.UpdateUser(3, cb_pk_id, Firstname, Lastname, Password, Email, Phone, ins_del_id, lastModifier);
                userMaster.Error = ReturnError(0, string.Empty);
            }
            catch (Exception ex)
            {
                userMaster.Error = ReturnError(400, ex.ToString());
            }
            return userMaster;
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<UserMaster> Get(int id)
        {
            UserMaster userMaster = new UserMaster();

            try
            {
                userMaster = await _dBHelperRepo.GetUserById(id);
                
            }
            catch (Exception ex)
            {
                userMaster.Error = ReturnError(404, ex.Message);
            }
            return userMaster;
        }
    }
}