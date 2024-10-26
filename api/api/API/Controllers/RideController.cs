using Business.DTOs.AppUserDtos;
using Business.DTOs.RideDtos;
using Business.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private readonly IRideService _rideService;
        private readonly ILogger<RideController> _logger;
        private readonly IUserService _userService;
        private readonly IDriverService _driverService;

        public RideController(ILogger<RideController> logger, IRideService rideService, IUserService userService, IDriverService driverService)
        {
            _rideService = rideService;
            _logger = logger;
            _userService = userService;
            _driverService = driverService;
        }


        [HttpPost("AddRide")]
        public async Task<IActionResult> AddRide(RideAddDto dtoModel, IValidator<RideAddDto> validator)
        {
            if (dtoModel == null)
            {
                return BadRequest("Model is empty");
            }
            Console.WriteLine($"DTO:{dtoModel.RideTime}");

            var resultValidation = await validator.ValidateAsync(dtoModel);
            if (!resultValidation.IsValid)
            {
                return BadRequest(resultValidation.Errors);
            }

            var ride = await _rideService.RideCreateAsync(dtoModel);

            if (ride)
            {
                return Ok(ride);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create the ride due to a service error.");
            }
        }


        [HttpGet("GetRidesByUserEmail/{userEmail}")]
        public async Task<IActionResult> GetRidesByUserEmail(string userEmail)
        {
            if (userEmail is null)
            {
                return BadRequest("User email is null");
            }

            var existUser = await _userService.IsExistUser(userEmail);
            if (!existUser)
            {
                return NotFound("User wasn`t found");
            }

            var result = await _rideService.GetRidesByUserEmail(userEmail);

            return Ok(result);
        }

        [HttpGet("GetRidesByDriverEmail/{driverEmail}")]
        public async Task<IActionResult> GetRidesByDriverEmail(string driverEmail)
        {
            if (driverEmail is null)
            {
                return BadRequest("User email is null");
            }

            var existDriver = await _driverService.IsDriverExist(driverEmail);
            if (!existDriver)
            {
                return NotFound("Driver wasn`t found");
            }

            var result = await _rideService.GetRidesByDriverEmail(driverEmail);

            return Ok(result);
        }

        [HttpPut("CancaledRide/{rideId}")]
        public async Task<IActionResult> CancaledRide(int rideId)
        {
            var result = await _rideService.CancaledRide(rideId);

            if(result)
            {
                return Ok("Cancaeled!");
            }
            else
            {
                return BadRequest("Something went wrong...");
            }
        }

        [HttpGet("IsRideWaiting/{userEmail}")]
        public async Task<bool> IsRideWaiting(string userEmail)
        {
            return await _rideService.IsRideWaiting(userEmail);
        }
    }
}
