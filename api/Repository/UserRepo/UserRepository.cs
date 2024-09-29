using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }



    }
}