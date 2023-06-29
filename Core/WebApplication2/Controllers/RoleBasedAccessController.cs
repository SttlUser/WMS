using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using Repositories;

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

        

    }
}
