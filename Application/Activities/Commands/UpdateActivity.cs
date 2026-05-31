using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity= await context.Activities.FindAsync(request.Activity.Id);
            if (activity == null) throw new Exception("Activity not found");

            mapper.Map(request.Activity, activity);


            context.Activities.Update(activity);
            await context.SaveChangesAsync(cancellationToken);

            return request.Activity.Id;
        }
    }
}