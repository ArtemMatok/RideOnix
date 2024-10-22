using Business.DTOs.DriverDtos;
using Business.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IDriverService _driverService;

        public DriverController(IDriverService driverService)
        {
            _driverService = driverService;
        }

        [HttpGet("GetDrivers")]
        public async Task<IActionResult> GetDrivers()
        {
            return Ok(await _driverService.GetDrivers());
        }

        [HttpPost("AddDriver")]
        public async Task<IActionResult> AddDriver(DriverAddDto driverDto)
        {
            return Ok(await _driverService.AddDriver(driverDto));
        }

        [HttpPut("EditDriver")]
        public async Task<IActionResult> EditDriver(int id, DriverGetDto driverDto)
        {
            return Ok(await _driverService.UpdateDriver(id, driverDto));
        }
        
    }
}
