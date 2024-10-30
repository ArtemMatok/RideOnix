using AutoMapper;
using Business.DTOs.RideDtos;
using Business.Interfaces;
using Data.Entities;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class RideService : IRideService
    {
        private readonly IRideRepository _rideRepository;
        private readonly IDriverRepository _driverRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public RideService(IRideRepository rideRepository, IMapper mapper, IDriverRepository driverRepository, IUserRepository userRepository)
        {
            _rideRepository = rideRepository;
            _mapper = mapper;
            _driverRepository = driverRepository;
            _userRepository = userRepository;
        }

        public async Task<bool> AcceptingRide(int rideId)
        {
            var result = await _rideRepository.AcceptingRide(rideId);
            return result;
        }

        public async Task<bool> CancaledRide(int rideId)
        {
            bool result = await _rideRepository.CancaledRide(rideId);  
            return result;
        }

        public async Task<bool> FinishRide(int rideId)
        {
            var rideResult = await _rideRepository.StopRide(rideId);
            return rideResult;
        }

        public async Task<RideGetDto?> GetRideById(int rideId)
        {
            var ride =  await _rideRepository.GetRideById(rideId);  

            return _mapper.Map<RideGetDto?>(ride);  
        }

        public async Task<List<RideGetDto>> GetRidesByDriverEmail(string driverEmail)
        {
            var rides = await _rideRepository.GetRidesByDriverEmail(driverEmail);
            if(rides is null)
            {
                return new List<RideGetDto>();
            }
            else
            {
                return _mapper.Map<List<RideGetDto>>(rides);
            }
        }

        public async Task<List<RideGetDto>> GetRidesByUserEmail(string userEmail)
        {
            
            var rides = await _rideRepository.GetRidesByUserEmail(userEmail);

            if (rides is null)
            {
                return new List<RideGetDto>();  
            }

            var ridesMap = _mapper.Map<List<RideGetDto>>(rides);  

            return ridesMap;
        }

        public async Task<bool> IsRideWaiting(string userEmail)
        {
            var result = await _rideRepository.IsRideWaiting(userEmail);
            return result;
        }

        public async Task<bool> PaymentRide(int rideId, string paymentMethod)
        {
            var paymentResult = await _rideRepository.PaymentRide(rideId, paymentMethod);

            return paymentResult;
        }

        public async Task<bool> RatingRide(int rideId, int rating)
        {
            var result = await _rideRepository.RatingRide(rideId, rating);  
            return result;
        }

        public async Task<bool> RideCreateAsync(RideAddDto rideDtoModel)
        {
            if(rideDtoModel is null)
            {
                return false;
            }
           
            Ride rideForAdding = _mapper.Map<Ride>(rideDtoModel);

            var driver = await _driverRepository.GetDriverByIdAsync(rideForAdding.DriverId);
            var user = await _userRepository.GetUserByEmailAsync(rideDtoModel.userEmail);

            rideForAdding.Driver = driver;
            rideForAdding.AppUser = user;

            var result = await _rideRepository.AddRideAsync(rideForAdding);

            if(result)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> StartRide(int rideId)
        {
           var rideResult = await _rideRepository.StartRide(rideId);    
            return rideResult;  
        }
    }
}
