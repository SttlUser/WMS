using Npgsql;
using Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace PostgresDBHelper
{
    public class PostgresConnect : IPgDbDapperHelperRepo
    {
        public async Task<T> GetAsync<T>(string constring, string command, object parms)
        {
            T result;

            result = (await (new NpgsqlConnection(constring)).QueryAsync<T>(command, parms).ConfigureAwait(false)).FirstOrDefault();

            return result;
        }
        public async Task<List<T>> GetAll<T>(string constring, string command)
        {
            List<T> result = new List<T>();

            result = (await (new NpgsqlConnection(constring)).QueryAsync<T>(command)).ToList();

            return result;
        }
        public async Task<T> GetId<T>(string constring, string command, int parms)
        {
            T result;

            result = (await (new NpgsqlConnection(constring)).QueryAsync<T>(command, parms)).FirstOrDefault();

            return result;
        }
        //public async Task<List<T>> GetAll<T>(string constring, string command, object parms)
        //{
        //    List<T> result = new List<T>();

        //    result = (await (new NpgsqlConnection(constring)).QueryAsync<T>(command, parms)).ToList();

        //    return result;
        //}
        //public async Task<int> EditData(string constring, string command, object parms)
        //{
        //    int result;

        //    result = await (new NpgsqlConnection(constring)).ExecuteAsync(command, parms);

        //    return result;
        //}
    }
}
