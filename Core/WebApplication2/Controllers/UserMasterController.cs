using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using Repositories;

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
            List<UserMaster     > lstroleMaster = new List<UserMaster>();

            //lstroleMaster.Add(new RoleMaster { Id = 1, Name = "Role1" });
            //lstroleMaster.Add(new RoleMaster { Id = 2, Name = "Role2" });
            //lstroleMaster.Add(new RoleMaster { Id = 3, Name = "Role3" });
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
        public async Task<UserMaster> DeleteUser(int ins_del_id,int cb_pk_id)
        {
            UserMaster userMaster = new UserMaster();
            try
            {
                 userMaster = await _dBHelperRepo.DeleteUser(4, ins_del_id, cb_pk_id);   //1 is the dummy data for lastModified field                
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
    }
}
