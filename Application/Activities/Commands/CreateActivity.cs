using Application.Activities.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {

            var user = await userAccessor.GetUserAsync(); //using IUserAccessor to get the current user from the database using browser cookies and the httpContextAccessor. 
            var activity = mapper.Map<Activity>(request.ActivityDto);
            var attendee = new ActivityAttendee //create a new ActivityAttendee object to represent the current user as the host of the activity
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                IsHost = true
            };

            activity.Attendees?.Add(attendee); //add the attendee to the activity's Attendees collection
            context.Activities.Add(activity);

            await context.SaveChangesAsync(cancellationToken);

            return activity.Id;
        }
    }
}