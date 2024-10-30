using Business.DTOs.DriverDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IDriverService
    {
        Task<List<DriverGetDto>> GetDrivers();
        Task<DriverForRideDto> GetDriverById(int id);
        Task<DriverGetDto?> GetDriverFullById(int driverId);
        Task<bool> UpdateDriver(int id, DriverGetDto driverDto);
        Task<bool> AddDriver(DriverAddDto driverDto);
        Task<DriverGetDto?> GetDriverByEmail(string email);
        Task<bool> IsDriverExist(string driverEmail);
        Task<double> GetDriverRating(string driverEmail);
    }
}
