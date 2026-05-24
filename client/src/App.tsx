import { useState, useEffect } from 'react';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { ListItem, ListItemText, Typography } from '@mui/material';

function App() {
  // 2. Just tell useState to expect an array of Activity objects
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // 3. You can pass the type directly to axios.get<>! 
    // This automatically types response.data for you so you don't have to.
    axios.get<Activity[]>('https://localhost:7268/api/activities')
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <>
      <Typography variant="h1">Reactivities</Typography>
      {activities.map(activity => (
        <ListItem key={activity.id}>
          <ListItemText primary={activity.title} />
        </ListItem>
      ))
      }
    </>
  );
}

export default App;