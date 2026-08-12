import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useAccount } from "./useAccount";
import { useLocation } from "react-router";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const location = useLocation();

  const { isPending, data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && !!currentUser && location.pathname == "/activities",
    select: (data) => {
      return data.map((activity) => {
        return {
          ...activity,
          //check if the current user is going to the activity or not
          //some(): Checks if at least one item matches a condition.
          isGoing: activity.attendees.some((a) => a.id === currentUser?.id),
          // Checks if the current user is the host of the activity.
          isHost: activity.attendees.some(
            (a) => a.id === currentUser?.id && a.id === activity.hostId,
          ),
        };
      });
    },
  });

  const { isLoading: isLoadingActivity, data: activity } = useQuery<Activity>({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      return {
        ...data,
        //check if the current user is going to the activity or not
        //some(): Checks if at least one item matches a condition.
        isGoing: data.attendees.some((a) => a.id === currentUser?.id),
        // Checks if the current user is the host of the activity.
        isHost: data.attendees.some((a) => a.id === currentUser?.id && a.id === data.hostId),
      };
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put(`/activities/${activity.id}`, activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
