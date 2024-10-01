using Business.DTOs.AppUserDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Validation.AppUserValid
{
    public class LoginDtoValidator:AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(login => login.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("InvalidEmail format");

            RuleFor(login => login.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(6).WithMessage("Password must be at least 8 characters long ")
                .Matches(@"[A-Za-z]").WithMessage("Password must contain at least one letter")
                .Matches(@"[@#$]").WithMessage("Password must contain at least one special character (@, #, $)");
        }

    }
}
