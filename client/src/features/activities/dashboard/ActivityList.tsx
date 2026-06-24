import { Box } from "@mui/material";
import ActivityCards from "./ActivityCards";


type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
}

export default function ActivityList({ activities, selectActivity }: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 , mt:10}}>
            {activities.map(activity => (
                <ActivityCards
                    key={activity.id} 
                    selecteActivity={activity} 
                    selectActivity={selectActivity}  
                />
            ))}
        </Box>
    )
}