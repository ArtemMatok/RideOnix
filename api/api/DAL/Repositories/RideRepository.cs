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

        public async Task<bool> AcceptingRide(int rideId)
        {
            var ride = await _context.Rides
                .Include(x => x.Driver)
                .FirstOrDefaultAsync(x => x.RideId == rideId);

            if(ride is null)
            {
                return false;
            }

            ride.RideStatus = "Accepted";
            ride.PaymentStatus = "Waiting for payment";

            _context.Rides.Update(ride);
            var saved = await _context.SaveChangesAsync();  

            return saved > 0;
        }

        public async Task<bool> AddRideAsync(Ride rideModel)
        {
            rideModel.Driver.IsAvailable = false;

            await _context.Rides.AddAsync(rideModel);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> CancaledRide(int rideId)
        {
            var ride = await _context.Rides
                .Include(x=>x.Driver)
                .FirstOrDefaultAsync(x => x.RideId == rideId);

            if (ride == null)
            {
                return false;
            }

            ride.Driver.IsAvailable = true;
            ride.PaymentStatus = "Canceled";
            ride.RideStatus = "Canceled";

            _context.Rides.Update(ride);
            var saved =  await _context.SaveChangesAsync();

            return saved > 0;
        }

        public async Task<Ride?> GetRideById(int rideId)
        {
            return await _context.Rides.Include(x => x.Driver)
                .FirstOrDefaultAsync(x => x.RideId == rideId);
        }

        public async Task<List<Ride>?> GetRidesByDriverEmail(string driverEmail)
        {
            return await _context.Rides
                .Where(x => x.Driver.Email == driverEmail)
                .Include(x => x.Driver)
                .OrderByDescending(x=>x.RideId)
                .ToListAsync();
        }

        public async Task<List<Ride>?> GetRidesByUserEmail(string userEmail)
        {
            return await _context.Rides.Where(x => x.AppUser.Email == userEmail)
                .Include(x=>x.AppUser)
                .Include(x=>x.Driver)
                .OrderByDescending(x=>x.RideId)
                .ToListAsync();
        }

        public async Task<bool> IsRideWaiting(string userEmail)
        {
            var result = await _context.Rides
                .Where(x=>x.userEmail == userEmail)
                .AnyAsync(x => x.RideStatus.Contains("Waiting"));

            return result;
        }

        public async Task<bool> PaymentRide(int rideId,string paymentMethod)
        {
            var ride = await _context.Rides.FirstOrDefaultAsync(x => x.RideId == rideId);
            if(ride is null)
            {
                return false;
            }

            ride.PaymentStatus = $"Paid by {paymentMethod}";
            ride.RideStatus = "Waiting for start";

            _context.Rides.Update(ride);
            var saved = await _context.SaveChangesAsync();
            return saved > 0;
        }

        public async Task<bool> RatingRide(int rideId, int rating)
        {
            var ride = await _context.Rides
                 .Include(x => x.Driver)
                 .FirstOrDefaultAsync(x => x.RideId == rideId);
            if (ride is null)
            {
                return false;
            }
               
            ride.Driver.AllRaiting.Add(rating);
            ride.RideRaiting = rating;

            _context.Rides.Update(ride);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> StartRide(int rideId)
        {
            var ride = await _context.Rides.FirstOrDefaultAsync(x => x.RideId == rideId);
            if(ride is null)
            {
                return false;
            }
            ride.RideStatus = "Started";
            _context.Rides.Update(ride);
            var result = await _context.SaveChangesAsync();

            return result > 0;  
        }

        public async Task<bool> StopRide(int rideId)
        {
            var ride = await _context.Rides
            .Include(x=>x.Driver)
            .FirstOrDefaultAsync(x => x.RideId == rideId);
            if (ride is null)
            {
                return false;
            }
            ride.RideStatus = "Finished";
            ride.Driver.IsAvailable = true;
            _context.Rides.Update(ride);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
}
