using Business.Interfaces;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> IsExistUser(string userEmail)
        {
            var user = await _userRepository.GetUserByEmailAsync(userEmail);

            if (user == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
