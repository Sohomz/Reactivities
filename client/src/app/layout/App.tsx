import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

// Ensure you import your Activity type!
// import { Activity } from '../../types/activity'; 

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:7268/api/activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error("Error fetching activities:", error)); // Added error handling
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelect = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) {
        handleSelectActivity(id);
    } else {
        handleCancelSelect();
    }
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = async (activity: Activity) => {
    if (activity.id) {
      // Editing an existing activity
      setActivities(activities.map(x => x.id === activity.id ? activity : x));
      setSelectedActivity(activity);
    } else {
      // FIX: Use crypto.randomUUID() for a truly unique ID
      const newActivity = { ...activity, id: crypto.randomUUID() };
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  }

  const handleDeleteActivity = async (id: string) => {
    // Note: The try/catch here is currently doing nothing since the code inside 
    // is synchronous, but it's perfect if you plan to add axios.delete() here soon!
    try {
      setActivities(activities.filter(x => x.id !== id));
      // Optional: If you delete the currently selected activity, you probably want to deselect it!
      if (selectedActivity?.id === id) {
          handleCancelSelect();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // Added minHeight: '100vh' so the background color extends to the bottom of the screen
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelect={handleCancelSelect}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>
  )
}

export default App;