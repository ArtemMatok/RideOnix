using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        [HttpPost("payment-sheet")]
        public ActionResult<PaymentSheetCreateResponse> CreatePaymentSheet(PaymentRequest request)
        {
            if(request == null)
            {
                return BadRequest("Request is null");
            }

            var customerService = new CustomerService();

            var existingCustomers = customerService.List(new CustomerListOptions
            {
                Email = request.Email
            });

            Customer customer;

            if (existingCustomers.Data.Any())
            {
                // Використовуємо першого знайденого клієнта
                customer = existingCustomers.Data.First();
            }
            else
            {
                var customerOptions = new CustomerCreateOptions()
                { 
                    Email = request.Email,
                    Name = request.Name,    
                };
                customer = customerService.Create(customerOptions);
            }

            var ephemeralKeyOptions = new EphemeralKeyCreateOptions
            {
                Customer = customer.Id,
                StripeVersion = "2023-08-16",
            };
            var ephemeralKeyService = new EphemeralKeyService();
            var ephemeralKey = ephemeralKeyService.Create(ephemeralKeyOptions);

            var paymentIntentOptions = new PaymentIntentCreateOptions
            {
                Amount = (long)(request.Amount * 100),
                Currency = "usd",
                Customer = customer.Id,
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter
                // is optional because Stripe enables its functionality by default.
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            };
            var paymentIntentService = new PaymentIntentService();
            PaymentIntent paymentIntent = paymentIntentService.Create(paymentIntentOptions);

            return new PaymentSheetCreateResponse
            {
                PaymentIntent = paymentIntent.ClientSecret,
                EphemeralKey = ephemeralKey.Secret,

                Customer = customer.Id,
                PublishableKey = "pk_test_51NptwQIBIeskGBr17Y9fkO6p53V9HCEVAqEfSMYu2fX7eRvLX1ofcLbfImSqTY3CXJX4cCcZOTDbvexeVlqiMG0R00I6uPuecC",
            };
        }

    }

    public class PaymentSheetCreateResponse
    {
        public string PaymentIntent { get; set; }
        public string EphemeralKey { get; set; }
        public string Customer { get; set; }
        public string PublishableKey { get; set; }
    }

    public class PaymentRequest
    { 
        public string Name { get; set; }
        public string Email { get; set; }   
        public double Amount { get; set; }
    }


}
