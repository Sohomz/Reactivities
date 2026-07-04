import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link } from "react-router";

type Props = {
    selecteActivity: Activity;
}

export default function ActivityCard({ selecteActivity }: Props) {
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
                    <Button component={Link} to={`/activities/${activity.id}`} variant="contained" size="medium">
                        View
                    </Button>
                </Box>
            </CardActions>
        </Card>
    )
}