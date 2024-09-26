using api.Models;

namespace api.Services.TokenService
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
