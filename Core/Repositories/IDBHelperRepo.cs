using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        Task<RoleMaster> CreateRole(int flag, string name, int roletype, int createdBy);

        Task<List<RoleMasterData>> GetAllRoleMaster(int flag);
        Task<RoleMaster> DeleteRole(int flag, int roletype, string name , int roleid);
        #endregion

        #region "User Methods"
        Task<List<UserMaster>> GetAllUserMaster(int flag);
        Task<UserMaster> DeleteUser(int flag, int ins_del_id, int cb_pk_id);



        #endregion

    }
}