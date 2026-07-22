import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router"; // (or react-router-dom depending on your version)
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activityScehma";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

  // 2. You no longer need 'register' or 'errors' here!
  const { handleSubmit, reset, control } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });

  const navigate = useNavigate();

  // This perfectly handles setting your default values when editing!
  useEffect(() => {
    if (activity) {
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location };
    try {
      if (activity) {
        updateActivity.mutate({ ...activity, ...flattenedData } as Activity, {
          onSuccess: () => navigate(`/activities/${activity.id}`),
        });
      } else {
        createActivity.mutate(flattenedData as Activity, {
          onSuccess: (id) => {
            navigate(`/activities/${id}`);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingActivity) return <Typography>Loading activity...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit Activity" : "Create Activity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {/* 3. Look how much cleaner this is! Your component does the heavy lifting. */}
        <TextInput name="title" control={control} label="Title" />

        <TextInput name="description" control={control} label="Description" multiline rows={3} />

        <Box display="flex" gap={3}>
          <SelectInput items={categoryOptions} label="Category" control={control} name="category" />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>

        <LocationInput control={control} label="Enter the location" name="location" />

        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" component={Link} to="/activities">
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            loading={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
