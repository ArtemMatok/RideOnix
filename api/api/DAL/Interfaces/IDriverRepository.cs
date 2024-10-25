using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IDriverRepository
    {
        Task<List<Driver>> GetDriverAsync();
        Task<Driver> GetDriverByIdAsync(int id);
        Task<bool> AddDriverAsync(Driver driver);
        Task<bool> UpdateDriverAsync(int id, Driver driverForUpdate);
        Task<Driver?> GetDriverByEmail (string email); 
    }
}
