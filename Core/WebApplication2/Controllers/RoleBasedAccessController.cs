﻿using Microsoft.AspNetCore.Mvc;
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
                roleAccess = await _dBHelperRepo.GetRoleBasedAccess(1,roleid);                
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
                roleAccess = await _dBHelperRepo.ParentBasedAccess(1, roleid);
                for (int i = 0; i < roleAccess.Count; i++)
                {
                    if (roleAccess[i].ParentId != 0)
                    {
                        roleAccess[i].ParentChildData.Add(roleAccess[i].ParentId);
                    }
                }
                roleAccess = await _dBHelperRepo.ParentBasedAccess(1, roleid);

                var filteredRoleAccess = roleAccess.Where(ra => ra.ParentId != 0).ToList();

                filteredRoleAccess.ForEach(ra => ra.ParentChildData.Add(ra.ParentId));

            }
            catch (Exception)
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
                documentIds = documentIdArray.ToObject<List<int>>();
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
