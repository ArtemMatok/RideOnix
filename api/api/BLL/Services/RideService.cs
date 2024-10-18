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

        public async Task<RideAddDto> RideCreateAsync(RideAddDto rideDtoModel)
        {
            if(rideDtoModel is not null)
            {
                Ride rideForAdding = _mapper.Map<Ride>(rideDtoModel);

                var driver = await _driverRepository.GetDriverByIdAsync(rideForAdding.DriverId);
                var user = await _userRepository.GetUserByEmailAsync(rideDtoModel.userEmail);

                rideForAdding.Driver = driver;
                rideForAdding.AppUser = user;

                await _rideRepository.AddRideAsync(rideForAdding);

                return rideDtoModel;
            }

            return new RideAddDto();
        }
    }
}
