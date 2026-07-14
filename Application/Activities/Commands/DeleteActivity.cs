using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id);

            if (activity == null)
                return Result<string>.Failure("Activity not found",404);

            context.Activities.Remove(activity);

            // Save changes and verify it was successful
            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
                return Result<string>.Failure("Failed to delete the activity from the database",500);

            // 3. Return the success result
            return Result<string>.Success(activity.Id);
        }
    }
}