using Business.DTOs.RideDtos;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private readonly IRideService _rideService;
        private readonly ILogger<RideController> _logger;

        public RideController(ILogger<RideController> logger, IRideService rideService)
        {
            _rideService = rideService;
            _logger = logger;
        }


        [HttpPost("AddRide")]
        public async Task<IActionResult> AddRide(RideAddDto dtoModel)
        {
            _logger.LogInformation($"DriverId: {dtoModel.DriverId}");
            _logger.LogInformation($"UserEmail: {dtoModel.userEmail}");
            return Ok(await _rideService.RideCreateAsync(dtoModel));
        }
    }
}
