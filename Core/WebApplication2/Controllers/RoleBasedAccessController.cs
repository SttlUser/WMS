using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
        public async Task<List<RoleAccess>> Get(int flag,int roleid)
        {
            List<RoleAccess> roleAccess = new List<RoleAccess>();
            try
            {
                roleAccess = await _dBHelperRepo.GetRoleBasedAccess(flag, roleid);                
            }
            catch (Exception)
            {
               // roleAccess.Error = ReturnError(400, string.Empty);
            }
            return roleAccess;
        }
        [HttpGet("RoleAccessBasedOnParent")]
        public async Task<List<RoleAccess>> ParentBasedAccess(int flag, int roleid)
        {
            List<RoleAccess> roleAccess = new List<RoleAccess>();
            try
            {
                roleAccess = await _dBHelperRepo.ParentBasedAccess(flag, roleid);
                
                for (int i = 0; i < roleAccess.Count; i++)
                {
                    roleAccess[i].flag = roleAccess[i].roleid != 0 ? true : false;
                    if (roleAccess[i].ParentId != 0)
                    {
                        //roleAccess.Where(x => x.documentid == roleAccess[i].ParentId).FirstOrDefault().ParentChildData.Add(roleAccess[i].documentid);

                       
                        if(roleAccess.Where(x => x.documentid == roleAccess[i].ParentId).FirstOrDefault().ParentChildData == null)
                        {
                            List<SelectListItem> child = new List<SelectListItem>();
                            
                            child.Add(new SelectListItem
                            {
                                Text = roleAccess[i].documentmasterfield,
                                Value = roleAccess[i].documentid.ToString(),
                                Disabled= roleAccess[i].roleid  == roleid ? true:false,

                            });
                            roleAccess.Where(x => x.documentid == roleAccess[i].ParentId).FirstOrDefault().ParentChildData = child;
                        }
                        else
                        {
                            roleAccess.Where(x => x.documentid == roleAccess[i].ParentId).FirstOrDefault().ParentChildData.Add(new SelectListItem
                            {
                                Text = roleAccess[i].documentmasterfield,
                                Value = roleAccess[i].documentid.ToString(),
                                Disabled = roleAccess[i].roleid == roleid ? true : false,
                            });
                        }
                        
                        //roleAccess.RemoveAt(i);
                        //roleAccess[i].ParentChildData.Add(roleAccess[i].documentid);
                        //roleAccess[i].ParentChildData.Append(roleAccess[i].documentid);
                    }
                    else
                    {
                        roleAccess[i].ParentChildData = new List<SelectListItem>(); 
                    }
                }
                roleAccess=roleAccess.Where(x=>x.ParentId == 0).ToList();
                //roleAccess = await _dBHelperRepo.ParentBasedAccess(1, roleid);

                //var filteredRoleAccess = roleAccess.Where(ra => ra.ParentId != 0).ToList();

                //filteredRoleAccess.ForEach(ra => ra.ParentChildData.Add(ra.ParentId));

            }
            catch (Exception ex)
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
                //documentIds = documentIdArray.ToObject<List<int>>().Select(int.Parse).ToList();
                documentIds = documentIdArray.ToObject<List<string>>()
                                              .Select(id => int.Parse(id))
                                              .ToList();
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



    }
}
