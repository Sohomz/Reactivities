using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure;

public class UserAccessor(HttpContextAccessor httpContextAccessor, AppDbContext context): IUserAccessor
{
    public string GetUserId() //get from cookies by httpContextAccessor
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new Exception("User ID not found in claims.");
    }

    public async Task<User> GetUserAsync() //get from database if user exists
    {
        return await context.Users.FindAsync(GetUserId())
                ?? throw new Exception("User not found in database.");
    }
}
