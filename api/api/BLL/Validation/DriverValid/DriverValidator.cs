using Business.DTOs.DriverDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Validation.DriverValid
{
    public class DriverValidator: AbstractValidator<DriverAddDto>
    {
        public DriverValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("Full Name is required.")
                .Matches(@"^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s]+$")
                .WithMessage("Full Name can only contain letters.");
        }
    }
}
