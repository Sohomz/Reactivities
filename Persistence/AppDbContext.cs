using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

//options is a class that contains all the options for configuring appsettings the context
public class AppDbContext (DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Domain.Activity> Activities {get; set;}
    public DbSet<Domain.ActivityAttendee> ActivityAttendees {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new {aa.UserId, aa.ActivityId}));

        builder.Entity<ActivityAttendee>()
            .HasOne(aa => aa.User)
            .WithMany(u => u.Activities)
            .HasForeignKey(aa => aa.UserId);

        builder.Entity<ActivityAttendee>()
            .HasOne(aa => aa.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);
    }
}