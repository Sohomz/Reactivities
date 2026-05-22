using Microsoft.EntityFrameworkCore;

namespace Persistence;

//options is a class that contains all the options for configuring appsettings the context
public class AppDbContext (DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Domain.Activity> Activities {get; set;}
}