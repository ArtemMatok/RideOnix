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
    public class RideRepository : IRideRepository
    {
        private readonly ApplicationDbContext _context;

        public RideRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddRideAsync(Ride rideModel)
        {
            await _context.Rides.AddAsync(rideModel);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<List<Ride>?> GetRidesByUserEmail(string userEmail)
        {
            return await _context.Rides.Where(x => x.AppUser.Email == userEmail)
                .Include(x=>x.AppUser)
                .Include(x=>x.Driver)
                .OrderByDescending(x=>x.RideId)
                .ToListAsync();
        }
    }
}
