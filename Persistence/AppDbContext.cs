using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

//options is a class that contains all the options for configuring appsettings the context
public class AppDbContext (DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Domain.Activity> Activities {get; set;}
}