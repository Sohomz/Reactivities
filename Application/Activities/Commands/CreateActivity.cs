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

            var user = await userAccessor.GetUserAsync();
            var activity = mapper.Map<Activity>(request.ActivityDto);
            context.Activities.Add(activity);

            var attendee = new ActivityAttendee
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                IsHost = true
            };

            activity.Attendees?.Add(attendee);

            await context.SaveChangesAsync(cancellationToken);

            return activity.Id;
        }
    }
}