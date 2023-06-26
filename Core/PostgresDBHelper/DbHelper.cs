using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostgresDBHelper
{
    public class DbHelper : IDBHelperRepo
    {
        public AppSettings AppSettings { get; set; }
        private readonly IPgDbDapperHelperRepo _pgDbDapperHelperRepo;
        public DbHelper(IPgDbDapperHelperRepo pgDbDapperHelperRepo)
        {
            _pgDbDapperHelperRepo = pgDbDapperHelperRepo;
        }
        #region "User Login"
        public async Task<UserMaster> GetUser(string username, string password)
        {
                
            return await _pgDbDapperHelperRepo.GetAsync<UserMaster>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"GetUserDetails\"(@username,@password)", new { username, password });
        }
        #endregion

        #region "Role Management"
        public async Task<List<RoleType>> GetRoleType()
        {
            return await _pgDbDapperHelperRepo.GetAll<RoleType>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"RoleTypes\"");
            //return await _pgDbDapperHelperRepo.GetAll<RoleType>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"ManageRoleMaster\"(@roletypeid = null, @rolename=null,@flag=2)");

            //return await _pgDbDapperHelperRepo.GetAll<RoleType>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"RoleTypes\"");

        }
        public async Task<RoleType> GetRoleTypeById(int id)
        {
            return await _pgDbDapperHelperRepo.GetId<RoleType>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"RoleTypes\" where \"Id\" = " + id, 0);
        }
        public async Task<RoleMaster> CreateRole(int flag,string roleName, int roletype,int createdBy)
        {
            return await _pgDbDapperHelperRepo.GetAsync<RoleMaster>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"GetRoleMasterDetails\"(@flag,@roletype,@roleName,@CreatedBy) ", new {flag, roletype,roleName, createdBy });
        }
        public async Task<List<RoleMasterData>> GetAllRoleMaster(int flag=1)
        {
            return await _pgDbDapperHelperRepo.GetAll<RoleMasterData>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"GetRoleMasterDetails\"(@flag)", new {flag});
        }

        public async Task<RoleMaster> DeleteRole(int flag, int roletype, string name, int roleid)
        {
            return await _pgDbDapperHelperRepo.GetAsync<RoleMaster>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"GetRoleMasterDetails\" ( @flag,  @roletype,@rolename ,@roleid)", new { flag, roletype , rolename = name, roleid });

        }
        


        #endregion

        #region "User master"
        public async Task<List<UserMaster>> GetAllUserMaster(int flag)
        {
            return await _pgDbDapperHelperRepo.GetAll<UserMaster>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"GetUserMasterDetails\"(@flag)", new { flag }); 
        }
        public async Task<UserMaster> DeleteUser(int flag, int ins_del_id, int cb_pk_id)
        {
            return await _pgDbDapperHelperRepo.GetAsync<UserMaster>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"GetUserMasterDetails\" ( @flag,@ins_del_id,@cb_pk_id)", new { flag, ins_del_id, cb_pk_id  });

        }

        #endregion
    }
}

//int createdBy, String roleName, int roletype ,int flag = 1