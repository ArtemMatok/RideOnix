using Business.DTOs.AppUserDtos;
using Business.DTOs.DriverDtos;
using Business.Interfaces;
using Data.Entities;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.Formula.Functions;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signingManager;
        private readonly IDriverService _driverService;


        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signingManager, IDriverService driverService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signingManager = signingManager;
            _driverService = driverService;
        }

        [HttpPost("Register/{role}")]
        public async Task<IActionResult> Register(string role, RegisterDto registerDto, IValidator<RegisterDto> validator)
        {
            if (role is null)
            {
                return BadRequest("Role is required");
            }
            if(role =="User")
            {
                try
                {
                    ValidationResult resultValidation = await validator.ValidateAsync(registerDto);
                    if (!resultValidation.IsValid)
                    {
                        return BadRequest(resultValidation.Errors);
                    }


                    var appUser = new AppUser
                    {
                        UserName = registerDto.UserName,
                        Email = registerDto.Email,

                    };

                    var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                    if (createdUser.Succeeded)
                    {
                        var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                        if (roleResult.Succeeded)
                        {
                            return Ok(new NewUserDto()
                            {
                                Username = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            });
                        }
                        else
                        {
                            return StatusCode(500, roleResult.Errors);
                        }
                    }
                    else
                    {
                        return StatusCode(500, createdUser.Errors);
                    }

                }
                catch (Exception e)
                {

                    return StatusCode(500, e.Message);
                }
            }
            else if(role == "Driver")
            {
                
                try
                {
                    ValidationResult resultValidation = await validator.ValidateAsync(registerDto);
                    if (!resultValidation.IsValid)
                    {
                        return BadRequest(resultValidation.Errors);
                    }


                    var appUser = new AppUser
                    {
                        UserName = registerDto.UserName,
                        Email = registerDto.Email,

                    };
                    var driverAddDto = new DriverAddDto()
                    {
                        FullName = registerDto.UserName,
                        Email = registerDto.Email,
                    };

                    var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                    if (createdUser.Succeeded)
                    {
                        var roleResult = await _userManager.AddToRoleAsync(appUser, "Driver");
                        if (roleResult.Succeeded)
                        {
                            var driverResult = await _driverService.AddDriver(driverAddDto);
                            if (driverResult)
                            {
                                return Ok(new NewUserDto()
                                {
                                    Username = appUser.UserName,
                                    Email = appUser.Email,
                                    Token = _tokenService.CreateToken(appUser)
                                });
                            }
                            else
                            {
                                return BadRequest("Something went wrong suring adding driver");
                            }

                        }
                        else
                        {
                            return StatusCode(500, roleResult.Errors);
                        }
                    }
                    else
                    {
                        return StatusCode(500, createdUser.Errors);
                    }

                }
                catch (Exception e)
                {

                    return StatusCode(500, e.Message);
                }
            }
            else
            {
                return BadRequest("Role wasn`t found");
            }
            
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto, [FromServices] IValidator<LoginDto> validator)
        {
            ValidationResult resultValidation = await validator.ValidateAsync(loginDto);
            if(!resultValidation.IsValid)
            {
                return BadRequest(resultValidation.Errors);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user is null)
            {
                return Unauthorized("Invalid Email");
            }

            var result = await _signingManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Email not found and/or password incorrect");
            }

            return Ok(
                new NewUserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("LoginDriver")]
        public async Task<IActionResult> LoginDriver(LoginDto loginDto, [FromServices] IValidator<LoginDto> validator)
        {
            // Валідую вхідні дані
            ValidationResult resultValidation = await validator.ValidateAsync(loginDto);
            if (!resultValidation.IsValid)
            {
                return BadRequest(resultValidation.Errors);
            }

            // Перевірка наявності користувача з введеним email
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user is null)
            {
                return Unauthorized("Invalid Email");
            }

            // Перевірка пароля
            var result = await _signingManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Email not found and/or password incorrect");
            }

            // Отримання ролей користувача
            var roles = await _userManager.GetRolesAsync(user);


            if (!roles.Contains("Driver"))
            {
                return Forbid("User does not have the required role.");
            }

            // Успішний вхід з поверненням токена
            return Ok(
                new NewUserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }


        [HttpGet("GetUserByEmail/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user is null)
            {
                return NotFound();
            }

            return Ok(new UserGetDto()
            {
                Email = user.Email,
                Username = user.UserName,
            });
        }
    }
}
