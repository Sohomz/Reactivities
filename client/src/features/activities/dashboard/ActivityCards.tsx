import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    selecteActivity: Activity;
    selectActivity: (id: string) => void
}

export default function ActivityCard({ selecteActivity, selectActivity }: Props) {
    const {activities,deleteActivity}=useActivities();
    const activity = activities?.find((x) => x.id === selecteActivity?.id);
    if (!activity) return <Typography>Activity not found</Typography>;
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {activity.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                    {activity.date}
                </Typography>
                <Typography variant="body2">
                    {activity.description}
                </Typography>
                <Typography variant="subtitle1">
                    {activity.city} / {activity.venue}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Button onClick={() => deleteActivity.mutate(activity)} variant="contained" color="error" size="medium" disabled={deleteActivity.isPending}>Delete</Button>
                    <Button onClick={() => selectActivity(activity.id)} variant="contained" size="medium">View</Button>
                </Box>
            </CardActions>
        </Card>
    )
}