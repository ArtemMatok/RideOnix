﻿using Business.DTOs.RideDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IRideService
    {
        Task<bool> RideCreateAsync(RideAddDto rideDtoModel);
        Task<List<RideGetDto>> GetRidesByUserEmail(string email);
        Task<List<RideGetDto>> GetRidesByDriverEmail(string driverEmail);
        Task<bool> CancaledRide(int rideId);
        Task<bool> IsRideWaiting(string userEmail);
        Task<bool> AcceptingRide(int rideId);
        Task<RideGetDto?> GetRideById(int rideId);
        Task<bool> PaymentRide(int rideId, string paymentMethod);
        Task<bool> StartRide(int rideId);
        Task<bool> FinishRide(int rideId);
        Task<bool> RatingRide(int rideId, int rating);
    }
}
