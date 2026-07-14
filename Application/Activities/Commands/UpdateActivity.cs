using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required UpdateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity= await context.Activities.FindAsync(request.ActivityDto.Id);
            if (activity == null)
                return Result<string>.Failure("Activity not found", 404);

            mapper.Map(request.ActivityDto, activity);

            context.Activities.Update(activity);
            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
                return Result<string>.Failure("Failed to update the activity", 500);

            return Result<string>.Success(activity.Id);
        }
    }
}