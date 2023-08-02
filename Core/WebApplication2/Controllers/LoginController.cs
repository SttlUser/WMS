using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
//using Microsoft.IdentityModel.Tokens;
using Models;
//using Models.Request;
using Repositories;
//using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace WebApplication2.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class LoginController
    {
        private readonly IDBHelperRepo _dBHelperRepo;
        private readonly AppSettings _appSettings = null;
        public LoginController(IOptions<AppSettings> appSettings, IDBHelperRepo dBHelperRepo)
        {
            _dBHelperRepo = dBHelperRepo;
            _dBHelperRepo.AppSettings = appSettings.Value;
            _appSettings = appSettings.Value;
        }
        [HttpPost("UserLogin")]
        public async Task<LoginResponse> UserLogin([FromBody] LoginRequest loginRequest)
        {
            LoginResponse loginResponse = new LoginResponse();
            try
            {
                UserMaster userMaster = await _dBHelperRepo.GetUser(loginRequest.username, loginRequest.password);
                if (userMaster == null)
                {
                    loginResponse.ErrorInfo = ReturnError(1000, "User Invalid");
                }
                else
                {
                    loginResponse.ErrorInfo = ReturnError(0, string.Empty);
                }
            }
            catch (Exception ex)
            {
                loginResponse.ErrorInfo = ReturnError(1001, ex.ToString());
            }
            
            return loginResponse;
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
