using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Repositories;
using System.Text.Json.Nodes;
using B1SLayer;
using Flurl;
using System.Data;
using System.Numerics;


namespace WebApplication2.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CompanyMasterController
    {
        private readonly IDBHelperRepo _dBHelperRepo;
        private readonly AppSettings _appSettings = null;
        public CompanyMasterController(IOptions<AppSettings> appSettings, IDBHelperRepo dBHelperRepo)
        {
            _dBHelperRepo = dBHelperRepo;
            _dBHelperRepo.AppSettings = appSettings.Value;
            _appSettings = appSettings.Value;
        }


        [HttpGet("GetCompanyDetails")]
        public async Task<List<GetCompanyMaster> > companyMasters(int flag)
        {
            List<GetCompanyMaster>  companyMaster = new List<GetCompanyMaster>();
            try
            {
                companyMaster = await _dBHelperRepo.GetCompanyDetail(1);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return companyMaster;
        }


        [HttpPost("RegisterCompany2")]
        public async Task<CompanyMaster> Create( [FromBody] CompanyMaster user)
        {
            List<CompanyMaster> companyMasters = new List<CompanyMaster>();
            List<string> sapcompanyname = new List<string>();
            List<string> DbName = new List<string>();


            SLLoginResponse Result =new SLLoginResponse();
            List<string> sample=new List<string>();
            try
            {
                int count = 0;
                for(int i = 0; i < user.DbName.Count(); i++)
                {
                    try
                    {

                   SLConnection  connect= new SLConnection(new Uri(user.SLUrl), user.DbName[i].DBName, user.slusername, user.SLPassword);
                    SLLoginRequest sLLoginRequest = new SLLoginRequest();
                    sLLoginRequest.UserName = user.slusername;
                    sLLoginRequest.Password = user.SLPassword;
                    sLLoginRequest.CompanyDB = user.DbName[i].DBName;
                    Result = await connect.Request("Login").PostAsync<SLLoginResponse>(sLLoginRequest);
                    Console.WriteLine(connect);
                    if (Result.SessionId == null)
                    {
                        count++;
                        user.DbName[i].Flag= false;
                        companyMasters[i].Error= ReturnError(500,"server error:" + user.DbName[i].DBName.ToString());
                        }
                    else
                    {
                        user.DbName[i].Flag = true;
                    }

                    }
                    catch (Exception e)
                    {
                        count++;
                        user.DbName[i].Flag = false;
                        user.Error= ReturnError(400,"Connection failed for Db:" + user.DbName[i].DBName.ToString());
                        Console.Write("error");
                    }
                }
                if (count == 0)
                {
                    companyMasters = await _dBHelperRepo.RegisterCompany(2, user.Name, user.SLUrl, user.slusername, user.SLPassword, user.Lastmodifiedby, user.phone, user.email, user.DatabaseType, sapcompanyname,
                   DbName, user.comp_id, user.hasPutAwayProc, user.hasSsccNoManagement, user.hasCartonNoManagement, user.hasAutoBatchConfigurator, user.defaultWarehouseCode);
                }

               
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return user;
        }



        [HttpPost("DeleteCompanyDb")]
        public async Task<CompanyMaster> DeleteCompanyDb([FromBody] JsonArray usr)
       {

            CompanyMaster comapnydelete = new CompanyMaster();
            int flag = (int)usr[0];
            int  company_id = (int)usr[2];
            int LastModifiedById = (int)usr[1];

            try
            {
                comapnydelete = await _dBHelperRepo.DeleteCompanyDb(flag, null, null, null, null, LastModifiedById, null, null, null, null, null, company_id);   //1 is the dummy data for lastModified field                
            }
            catch (Exception ex)
            {
                //comapnydelete.Error = ReturnError(404, ex.Message);
            }
            return comapnydelete;

        }


        [HttpGet("GetCompanyDataById")]
        public async Task<CompanyMaster> GetData(int flag,int id)
        {
            //CompanyMaster companymaster =new CompanyMaster();
            CompanyMaster companyMasterResponse = new CompanyMaster();
            try
            {
                //companymaster = await _dBHelperRepo.GetCompanyDataByID(7, null, null, null, null, 0, null, null, null, null, null, id);
                List< CompanyMaster >  comapnylist = await _dBHelperRepo.GetCompanyDataByID(7, null, null, null, null, 0, null, null, null, null, null, id);
                List<DBNames> DBNames = new List<DBNames>();
                if (comapnylist.Count > 0)
                {
                    foreach (var dbData in comapnylist)
                    {

                        DBNames.Add(new Models.DBNames
                        {
                            DBName = dbData.SLDBName,
                            Flag = (bool)dbData.Flag,
                            SAPCompanyName = dbData.SAPCompanyName
                        });
                    }
                companyMasterResponse = comapnylist[0];
                companyMasterResponse.DbName = DBNames;
                }

            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
            return companyMasterResponse;
        }

        [HttpPost("UpdateCompanyDetail")]
        public async Task<CompanyMaster> Update( [FromBody] CompanyMaster user)
        {
            List<CompanyMaster> companyMasters = new List<CompanyMaster>();
            List<string> sapcompanyname = new List<string>();
            List<string> DbName = new List<string>();


            SLLoginResponse Result =new SLLoginResponse();
            List<string> sample=new List<string>();
            try
            {
                int count = 0;
                for(int i = 0; i < user.DbName.Count(); i++)
                {
                    try
                    {

                   SLConnection  connect= new SLConnection(new Uri(user.SLUrl), user.DbName[i].DBName, user.slusername, user.SLPassword);
                    SLLoginRequest sLLoginRequest = new SLLoginRequest();
                    sLLoginRequest.UserName = user.slusername;
                    sLLoginRequest.Password = user.SLPassword;
                    sLLoginRequest.CompanyDB = user.DbName[i].DBName;
                    Result = await connect.Request("Login").PostAsync<SLLoginResponse>(sLLoginRequest);
                    Console.WriteLine(connect);
                    if (Result.SessionId == null)
                    {
                        count++;
                        user.DbName[i].Flag= false;
                        companyMasters[i].Error = ReturnError(500, "server error:" + user.DbName[i].DBName.ToString());

                        }
                        else
                    {
                        user.DbName[i].Flag = true;
                    }

                    }
                    catch (Exception e)
                    {
                        count++;
                        user.DbName[i].Flag = false;
                        user.Error = ReturnError(400, "Connection failed for Db:" + user.DbName[i].DBName.ToString());

                    }
                }
                if (count == 0)
                {
                    companyMasters = await _dBHelperRepo.RegisterCompany(3, user.Name, user.SLUrl, user.slusername, user.SLPassword, user.Lastmodifiedby, user.phone, user.email, user.DatabaseType, sapcompanyname,
                  DbName, user.comp_id, user.hasPutAwayProc, user.hasSsccNoManagement, user.hasCartonNoManagement, user.hasAutoBatchConfigurator, user.defaultWarehouseCode);
                }

                    
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

            }
            return user;
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
