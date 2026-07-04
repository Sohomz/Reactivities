import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";


export default function ActivityDetails() {
    const navigate=useNavigate();
    const {id}=useParams<{id:string}>();
    const { activity, isActivityPending } = useActivities(id);

    if (id && isActivityPending) return <Typography>Loading...</Typography>;

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
                <Button component={Link} to={`/manage/${activity.id}`} color="primary">
                    Edit
                </Button>
                <Button onClick={()=>navigate('/activities')} color='inherit'>
                    Cancel
                </Button>
            </CardActions>
        </Card>
    )
}