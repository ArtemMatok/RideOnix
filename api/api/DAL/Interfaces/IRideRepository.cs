using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IRideRepository
    {
        Task<bool> AddRideAsync(Ride rideModel);
        Task<List<Ride>?> GetRidesByUserEmail(string userEmail);
    }
}
