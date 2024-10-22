using Data.Data;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class DriverRepository : IDriverRepository
    {
        private readonly ApplicationDbContext _context;

        public DriverRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddDriverAsync(Driver driver)
        {
            await _context.Drivers.AddAsync(driver);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateDriverAsync(int id, Driver driverForUpdate)
        {
            var driver = await _context.Drivers.FirstOrDefaultAsync(x => x.DriverId == id);

            if(driver is null)
            {
                return false;
            }
            else
            {
                _context.Entry(driver).CurrentValues.SetValues(driverForUpdate);
                await _context.SaveChangesAsync();

                return true;
            }
        }

        public async Task<List<Driver>> GetDriverAsync()
        {
            return await _context.Drivers.ToListAsync();
        }

        public async Task<Driver> GetDriverByIdAsync(int id)
        {
            return await _context.Drivers.FirstOrDefaultAsync(x => x.DriverId == id);
        }
    }
}
