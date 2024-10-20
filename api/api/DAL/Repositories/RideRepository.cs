using Data.Data;
using Data.Entities;
using Data.Interfaces;
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
    }
}
