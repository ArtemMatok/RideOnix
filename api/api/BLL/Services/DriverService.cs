using AutoMapper;
using Business.DTOs.DriverDtos;
using Business.Interfaces;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class DriverService : IDriverService
    {
        private readonly IDriverRepository _driverRepository;
        private readonly IMapper _mapper;

        public DriverService(IDriverRepository driverRepository, IMapper mapper)
        {
            _driverRepository = driverRepository;
            _mapper = mapper;
        }

        public async Task<DriverForRideDto> GetDriverById(int id)
        {
            var driver = await _driverRepository.GetDriverByIdAsync(id);

            DriverForRideDto driverDto = _mapper.Map<DriverForRideDto>(driver);

            //driverDto.FirstName = driver.FirstName;
            //driverDto.LastName = driver.LastName;
            //driverDto.CarSeats = driver.CarSeats;

            return driverDto;
        }

        public async Task<List<DriverGetDto>> GetDrivers()
        {
            var drivers = await _driverRepository.GetDriverAsync();
            if(drivers is null)
            {
                return new List<DriverGetDto>();
            }
            List<DriverGetDto> driversDto = _mapper.Map<List<DriverGetDto>>(drivers);

            return driversDto;
        }
    }
}   
