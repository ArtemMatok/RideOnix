using Business.DTOs.AppUserDtos;
using Business.DTOs.RideDtos;
using Data.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Validation.RideValid
{
    public class RideValidator : AbstractValidator<RideAddDto>
    {
        public RideValidator()
        {
            RuleFor(x => x.OriginAddress)
                .NotEmpty().WithMessage("Origin Address is required.");

            RuleFor(x => x.DestinationAddress)
                .NotEmpty().WithMessage("Destination Address is required.");
                

            RuleFor(x => x.OriginLatitude)
                .NotEmpty().WithMessage("Origin Latitude is required.");

            RuleFor(x => x.OriginLongitude)
                .NotEmpty().WithMessage("Origin Longitude is required.");

            RuleFor(x => x.DestinationLatitude)
                .NotEmpty().WithMessage("Destination Latitude is required.");

            RuleFor(x => x.DestinationLongitude)
                .NotEmpty().WithMessage("Destination Longitude is required.");

            RuleFor(x => x.RideTime)
                .GreaterThan(0).WithMessage("Ride time must be greater than zero.");

            RuleFor(x => x.FarePrice)
                .NotEmpty().WithMessage("Fare Price is required.");


            RuleFor(x => x.PaymentStatus)
                .NotEmpty().WithMessage("Payment Status is required.")
                .Must(status => new[] { "Paid", "Unpaid", "Pending" }.Contains(status))
                .WithMessage("Payment Status must be either 'Paid', 'Unpaid', or 'Pending'.");

            RuleFor(x => x.userEmail)
                .NotEmpty().WithMessage("User Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

           
        }
    }
}
