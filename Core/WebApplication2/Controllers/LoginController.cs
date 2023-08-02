using B1SLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
//using Microsoft.IdentityModel.Tokens;
using Models;
//using Models.Request;
using Repositories;
//using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;

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
                //Commented below code to remove the error while testing
                loginRequest.password = EncryptMethod.encrypt(loginRequest.password);
                
                UserMaster userMaster = await _dBHelperRepo.GetUser(loginRequest.username, loginRequest.password);
                if (userMaster == null)
                {
                    loginResponse.ErrorInfo = ReturnError(1000, "User Invalid");
                }
                else
                {
                    loginResponse.id = userMaster.Id;
                    loginResponse.username = userMaster.UserName;
                    loginResponse.ErrorInfo = ReturnError(0, string.Empty);
                }
            }
            catch (Exception ex)
            {
                loginResponse.ErrorInfo = ReturnError(1001, ex.ToString());
            }
            
            return loginResponse;
        }
        [HttpPost("ChangePassword")]
        public async Task<ChangePassword> UserPassword([FromBody] JsonObject role)
        {
            ChangePassword changerespo = new ChangePassword();
            UserMaster usermaster = new UserMaster();
            try
            { 
                int id = Convert.ToInt32(role["loggedInId"].ToString());
                int flag = Convert.ToInt32(role["flag"].ToString());
                string oldPassword = (string)role["oldPassword"];
                string newPassword = (string)role["newPassword"];

                //ChanegPass.OldPassword=EncryptMethod.encrypt(ChanegPass.OldPassword);
                //ChanegPass.NewPassword=EncryptMethod.encrypt(ChanegPass.NewPassword);
                changerespo = await _dBHelperRepo.UpdatePassword(flag,id,0, oldPassword, newPassword);

            }
            catch
            {
                // changerespo.ErrorInfo = ReturnError(1001, ex.ToString());
                changerespo.ErrorInfo = ReturnError(400, "Not able to change Password"); 
            }

            return changerespo;
        }

        [HttpPost("Forgot/Password")]
        public async Task<ChangePassRes> ForgotPass([FromBody] JsonObject role)
        {
            ChangePassRes changerespo = new ChangePassRes();

            try
            {
                int id = Convert.ToInt32(role["id"].ToString());
                string username= (string)role["username"];  
                string password= (string)role["password"];

                //ChanegPass.OldPassword=EncryptMethod.encrypt(ChanegPass.OldPassword);
                //ChanegPass.NewPassword=EncryptMethod.encrypt(ChanegPass.NewPassword);
                UserMaster userMaster = await _dBHelperRepo.Forgotpasss(3,id,username,password);

                if (userMaster == null)
                {
                    changerespo.ErrorInfo = ReturnError(1002, "User not found or password update failed.");
                }
                else
                {
                    
                    changerespo.Message = "Password Successfully Updated";
                }
            }
            catch (Exception ex)
            {
                changerespo.ErrorInfo = ReturnError(1001, ex.ToString());
            }

            return changerespo;
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
