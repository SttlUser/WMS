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
        Task<UserMaster> GetUser(string username, string password);
        Task<List<RoleType>> GetRoleType();
        Task <RoleType> GetRoleTypeById(int id);
        Task<RoleMaster> CreateRole(string name, int roleId, int flag);
    }
}