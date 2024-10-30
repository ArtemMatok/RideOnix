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

        [HttpPut("EditDriver/{driverId}")]
        public async Task<IActionResult> EditDriver(int driverId, DriverGetDto driverDto)
        {
            if(driverId == 0)
            {
                return BadRequest("Driver id is 0");
            }
            var result = await _driverService.UpdateDriver(driverId, driverDto);

            if(result)
            {
                return Ok("Success edit");
            }
            else
            {
                 return BadRequest("Somehting went wrong in service");
            }
           
        }

        [HttpGet("GetDriverByEmail/{driverEmail}")]
        public async Task<IActionResult> GetDriverByEmail(string driverEmail)
        {
            if(driverEmail is null)
            {
                return BadRequest("Driver Email is null");
            }
            var driver = await _driverService.GetDriverByEmail(driverEmail);  
            if(driver is null)
            {
                return NotFound("Driver wasn`t found");
            }
            return Ok(driver);
        }

        [HttpGet("GetDriverFullById/{driverId}")]
        public async Task<IActionResult> GetDriverFullById(int driverId)
        {
            var driver = await _driverService.GetDriverFullById(driverId);  
            if(driver is null)
            {
                return NotFound();
            }
            return Ok(driver);      
        }

        [HttpGet("GetDriverRating/{driverEmail}")]
        public async Task<IActionResult> GetDriverRating(string driverEmail)
        {
            try
            {
                var rating = await _driverService.GetDriverRating(driverEmail);
                return Ok(rating);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
