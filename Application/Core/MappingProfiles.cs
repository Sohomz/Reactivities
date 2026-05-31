using Domain;

namespace Application.Activities.Commands;
public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
    }
}