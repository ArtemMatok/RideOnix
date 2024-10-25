using AutoMapper;
using Business.DTOs.DriverDtos;
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
    public class DriverService : IDriverService
    {
        private readonly IDriverRepository _driverRepository;
        private readonly IMapper _mapper;

        public DriverService(IDriverRepository driverRepository, IMapper mapper)
        {
            _driverRepository = driverRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddDriver(DriverAddDto driverDto)
        {
            if(driverDto is not null)
            {
                Driver driver = _mapper.Map<Driver>(driverDto);

                await _driverRepository.AddDriverAsync(driver);

                return true;
            }
            return false;
        }

        public async Task<DriverGetDto?> GetDriverByEmail(string email)
        {
            var driver = await _driverRepository.GetDriverByEmail(email);
            
            if(driver is null)
            {
                return null;
            }
            return _mapper.Map<DriverGetDto>(driver);  
        }

        public async Task<DriverForRideDto> GetDriverById(int id)
        {
            var driver = await _driverRepository.GetDriverByIdAsync(id);

            DriverForRideDto driverDto = _mapper.Map<DriverForRideDto>(driver);

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

        public async Task<bool> IsDriverExist(string driverEmail)
        {
            var driver = await _driverRepository.GetDriverByEmail(driverEmail);
            if (driver is null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public async Task<bool> UpdateDriver(int id, DriverGetDto driverDto)
        {
            if(id == 0)
            {
                return false;
            }
            else
            {
                if(driverDto is null)
                {
                    return false;
                }
                else
                {
                    Driver driver = _mapper.Map<Driver>(driverDto);
                    if(driver.TypeOfCar == "Business")
                    {
                        driver.CarImage = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png";
                    }
                    else
                    {
                        driver.CarImage = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png";
                    }

                    await _driverRepository.UpdateDriverAsync(id, driver);

                    return true;
                }
            }
        }
    }
}   
