using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IRideRepository
    {
        Task<bool> AddRideAsync(Ride rideModel);
        Task<List<Ride>?> GetRidesByUserEmail(string userEmail);
        Task<List<Ride>?> GetRidesByDriverEmail(string driverEmail);
        Task<bool> CancaledRide(int rideId);
        Task<bool> IsRideWaiting(string userEmail);
        Task<bool> AcceptingRide(int rideId);
        Task<Ride?> GetRideById(int rideId);
        Task<bool> PaymentRide(int rideId, string paymentMethod);
        Task<bool> StartRide(int rideId);
        Task<bool> StopRide(int rideId);
        Task<bool> RatingRide(int rideId, int rating);
    }
}
