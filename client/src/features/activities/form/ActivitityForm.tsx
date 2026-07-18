import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link, useParams } from "react-router"; // (or react-router-dom depending on your version)
import { useForm, type FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activityScehma";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";


export default function ActivityForm() {
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
  
  // 2. You no longer need 'register' or 'errors' here!
  const {
    handleSubmit,
    reset,
    control
  } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });

  const onSubmit = (data: FieldValues) => console.log(data);

  // This perfectly handles setting your default values when editing!
  useEffect(() => {
    if (activity) {
      // Small fix for the date format if needed before resetting
      const formattedActivity = {
         ...activity,
         date: new Date(activity.date).toISOString().split("T")[0]
      };
      reset(formattedActivity);
    }
  }, [activity, reset]);

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
        
        <TextInput 
          name="description" 
          control={control} 
          label="Description" 
          multiline 
          rows={3} 
        />
        
        <TextInput name="category" control={control} label="Category" />
        
        <TextInput 
          name="date" 
          control={control} 
          label="Date" 
          type="date" 
        />
        
        <TextInput name="city" control={control} label="City" />
        
        <TextInput name="venue" control={control} label="Venue" />

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