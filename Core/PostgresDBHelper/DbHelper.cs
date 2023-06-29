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
        public async Task<RoleMasterData> CreateRole(int flag,string roleName, int roletype, int createdBy)
        {
            return await _pgDbDapperHelperRepo.GetAsync<RoleMasterData>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"GetRoleMasterDetails\"(@flag,@roletype,@createdBy,@roleName) ", new {flag, roletype, createdBy ,roleName});
        }
        public async Task<List<RoleMasterData>> GetAllRoleMaster(int flag=1)
        {
            return await _pgDbDapperHelperRepo.GetAll<RoleMasterData>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"GetRoleMasterDetails\"(@flag)", new {flag});
        }

        public async Task<RoleMasterData> DeleteRole(int flag, int LastModifiedById, int id)
        {
            return await _pgDbDapperHelperRepo.GetAsync<RoleMasterData>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"GetRoleMasterDetails\" (@flag,@LastModifiedById,@id)", new { flag, LastModifiedById,id});

        }
        public async Task<RoleMasterData> UpdateRoleData(int flag, string roleName, int roletype, int cb_pk_id, int lastModifiedBy)           
        {
            return await _pgDbDapperHelperRepo.GetAsync<RoleMasterData>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"GetRoleMasterDetails\"(@flag,@roletype,@cb_pk_id, @roleName,@lastModifiedBy)", new { flag, roletype ,cb_pk_id,roleName,lastModifiedBy });
        }

        public async Task<List<RoleMasterData>> GetRoleBasedAccess(int flag = 1)
        {
            return await _pgDbDapperHelperRepo.GetAll<RoleMasterData>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"\"(@flag)",new { flag});
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
        public async Task<UserMaster> CreateUser(int flag, string firstname, string lastname, string username, string email, string password, string phone, int cb_pk_id,int ins_del_id)
        {
            return await _pgDbDapperHelperRepo.GetAsync<UserMaster>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"GetUserMasterDetails\"(@flag,@ins_del_id,@cb_pk_id,@firstname,@lastname,@password,@email,@phone,@username) ", new {
                flag,
                cb_pk_id,
                ins_del_id,
                firstname,
                lastname,
                password,
                email,
                phone,
                username,          
            });
        }

        public async Task<UserMaster> UpdateUser(int flag, int cb_pk_id, string Firstname, string Lastname, string Password, string Email, string Phone, int ins_del_id)
        {

            return await _pgDbDapperHelperRepo.GetAsync<UserMaster>(AppSettings.ConnectionStrings.PgDbConStr, "SELECT * from \"SilverWMS\".\"GetUserMasterDetails\"(@flag, @ins_del_id , @cb_pk_id,@firstname,@lastname,@password,@email,@phone)", new { flag, ins_del_id, cb_pk_id, Firstname, Lastname, Password, Email, Phone });

        }


        public async Task<UserMaster> GetUserById(int id)
        {
            return await _pgDbDapperHelperRepo.GetId<UserMaster>(AppSettings.ConnectionStrings.PgDbConStr, "Select * from \"SilverWMS\".\"UserMaster\" where \"ID\" = " + id, 0);
        }
        #endregion

    }
}

//int createdBy, String roleName, int roletype ,int flag = 1