﻿using Business.DTOs.AppUserDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Validation.AppUserValid
{
    public class RegisterDtoValidator: AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Write correct email");

            RuleFor(x => x.Password)
               .NotEmpty().WithMessage("Password is required")
               .MinimumLength(6).WithMessage("Password must be at least 8 characters long ")
               .Matches(@"[A-Za-z]").WithMessage("Password must contain at least one letter")
               .Matches(@"[@#$]").WithMessage("Password must contain at least one special character (@, #, $)");

            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Username is required")
                .MinimumLength(2).WithMessage("User name must be more than 2 symbols");

        }
    }
}
