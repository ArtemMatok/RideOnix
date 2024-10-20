using Business.DTOs.RideDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IRideService
    {
        Task<bool> RideCreateAsync(RideAddDto rideDtoModel);
    }
}
