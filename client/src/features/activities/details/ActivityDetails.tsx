import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    selecteActivity: Activity | undefined;
    cancelSelect: () => void
    openForm: (id: string) => void
}

export default function ActivityDetails({ selecteActivity, cancelSelect, openForm }: Props) {
    const {activities}=useActivities();
    const activity = activities?.find((x) => x.id === selecteActivity?.id);
    if (!activity) return <Typography>Activity not found</Typography>;
    return (
        <Card sx={{ borderRadius: 3 , position: 'fixed', width: 600, zIndex: 501, mt:10}}>
            <CardMedia
                component='img'
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography sx={{ fontWeight: 'light' }} variant="subtitle1">
                    {activity.date}
                </Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => openForm(activity.id)}  color="primary">Edit</Button>
                <Button onClick={cancelSelect} color='inherit'>Cancel</Button>
            </CardActions>
        </Card>
    )
}