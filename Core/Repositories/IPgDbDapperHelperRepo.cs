using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IPgDbDapperHelperRepo
    {
        Task<T> GetAsync<T>(string constring, string command, object parms);
        Task<List<T>> GetAll<T>(string constring, string command);
        Task<T>GetId<T>(string constring, string command, int parms);
        Task<T> GetAsync<T>(string pgDbConStr, string v);
        Task<List<T>> GetAll<T>(string constring, string command, object flag);

        //Task<T> GetAsync<T>(string constring, string command, object parms);

    }
}
