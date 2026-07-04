import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (id?: string) => {
    // 1. Initialize the query client
    const queryClient = useQueryClient();

    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'], queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        }
    })

    const { data: activity, isPending: isActivityPending } = useQuery({
        queryKey: ['activities',id], queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id // Only run this query if id is provided
    })


    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.put<Activity>(`/activities/${activity.id}`, activity);
            return response.data;
        },
        // 2. Add the onSuccess callback
        onSuccess: () => {
            // 3. Invalidate the query to trigger an immediate refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post<Activity>('/activities', activity);
            return response.data;
        },
        // 2. Add the onSuccess callback
        onSuccess: () => {
            // 3. Invalidate the query to trigger an immediate refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    const deleteActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.delete<Activity>(`/activities/${activity.id}`);
            return response.data;
        },
        // 2. Add the onSuccess callback
        onSuccess: () => {
            // 3. Invalidate the query to trigger an immediate refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });
     
    return { activities,  isPending, updateActivity, createActivity, deleteActivity, activity, isActivityPending };
}