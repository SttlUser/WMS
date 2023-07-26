using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IDBHelperRepo
    {
        AppSettings AppSettings { get; set; }
        #region "Login Methods"
        Task<UserMaster> GetUser(string username, string password);
        #endregion
        #region "Role Methods"
        Task<List<RoleType>> GetRoleType();
        Task<RoleType> GetRoleTypeById(int id);
        Task<RoleMasterData> CreateRole(int flag, string roleName, int roletype, int createdBy);

        Task<List<RoleMasterData>> GetAllRoleMaster(int flag);
        Task<RoleMasterData> DeleteRole(int flag,  int id ,int LastModifiedById);

        Task<RoleMasterData> UpdateRoleData(int flag,string roleName, int roletype, int lastModifiedBy, int cb_pk_id);
        Task<List<RoleAccess>> GetRoleBasedAccess(int flag,int roleid);
        Task<UpdateRoleAccess> UpdateRoleAccess(int flag, int id , List<int> list);
        #endregion

        #region "User Methods"
        Task<List<UserMaster>> GetAllUserMaster(int flag);
        Task<UserMaster> DeleteUser(int flag, int ins_del_id, int cb_pk_id);
        Task<UserMaster> CreateUser(int flag, string firstname, string lastname, string username, string email, string password, string phone,  int cb_pk_id, int ins_del_id);
        Task<UserMaster> UpdateUser(int flag, int cb_pk_id, string Firstname, string Lastname, string Password, string Email, string Phone,int ins_del_id);
        Task<UserMaster> GetUserById(int id);
        #endregion
        #region Company Method
        Task<List<GetCompanyMaster>> GetCompanyDetail(int flag);
        Task<List<CompanyMaster>> RegisterCompany(int flag, string? company_name, string? slurl, string? slusername, string? slpassword, int lastmodifiedby, string? phone, string? email, string? db_type, List<string>? sapcompanyname, List<string>? sldbname, int company_id, bool? has_put_away_proc, bool? has_sscc_no_management, bool? has_carton_no_management, bool? has_auto_batch_configurator, int default_warehouse_code);

        Task<CompanyMaster> DeleteCompanyDb(int flag, string? company_name, string? slurl, string? slusername, string? slpassword, int lastmodifiedby, string? phone, string? email, string? db_type, List<string>? sapcompanyname, List<string>? sldbname, int comp_id);

        Task<CompanyMaster> UpdateComapnyDetail(int flag, string? company_name, string? slurl, string? slusername, string? slpassword, int lastmodifiedby, string? phone, string? email, string? db_type, List<string>? sapcompanyname, List<string>? sldbname, int company_id, bool? has_put_away_proc, bool? has_sscc_no_management, bool? has_carton_no_management, bool? has_auto_batch_configurator, int default_warehouse_code);
        Task<List<CompanyMaster>> GetCompanyDataByID(int flag, string company_name, string slurl, string slusername, string slpassword, int lastmodifiedby, string phone, string email, string db_type, List<string> sapcompanyname, List<string> sldbname, int comp_id);
        #endregion

    }
}