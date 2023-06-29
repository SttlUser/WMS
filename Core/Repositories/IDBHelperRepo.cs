using Models;
using System;
using System.Collections.Generic;
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
        Task<List<RoleMasterData>> GetRoleBasedAccess(int flag);
        #endregion

        #region "User Methods"
        Task<List<UserMaster>> GetAllUserMaster(int flag);
        Task<UserMaster> DeleteUser(int flag, int ins_del_id, int cb_pk_id);
        Task<UserMaster> CreateUser(int flag, string firstname, string lastname, string username, string email, string password, string phone,  int cb_pk_id, int ins_del_id);
        Task<UserMaster> UpdateUser(int flag, int cb_pk_id, string Firstname, string Lastname, string Password, string Email, string Phone,int ins_del_id);

        Task<UserMaster> GetUserById(int id);
        #endregion

    }
}