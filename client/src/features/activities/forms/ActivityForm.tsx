import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";


export default function ActivityForm() {
    const {id}=useParams<{id:string}>();
    const { updateActivity, createActivity , activity, isActivityPending} = useActivities(id);
    const navigate=useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (activity) {
            data.id = activity.id;
            updateActivity.mutate(data as unknown as Activity);
            navigate(`/activities/${activity.id}`);
        }
        else{
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`);
                },
                onError: (error) => {
                    console.error("Error creating activity:", error);
                },
            });
        }
        
    };

    if (id && isActivityPending) return <Typography>Loading...</Typography>;

    return (
        <Paper sx={{ borderRadius: 3, padding: 3, mt:10, position: 'fixed', width: 600, zIndex: 500 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? "Update activity" : "Create activity"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} key={id || 'create'} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField name="title" label="Title" defaultValue={activity?.title || ""} />
                <TextField name="description" label="Description" defaultValue={activity?.description || ""} multiline rows={3} />
                <TextField name="category" defaultValue={activity?.category || ""} label="Category" />
                <TextField name="date" defaultValue={activity?.date ? new Date(activity.date).toISOString().split("T")[0] : ""} label="Date" type="date" />
                <TextField name="city" defaultValue={activity?.city || ""} label="City" />
                <TextField name="venue" defaultValue={activity?.venue || ""} label="Venue" />
                <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
                    <Button color="inherit">Cancel</Button>
                    <Button type="submit" color="success" variant="contained" disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}