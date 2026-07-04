import { createBrowserRouter } from "react-router";
import App from "../App";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../../features/activities/forms/ActivityForm";
import HomePage from "../../../features/home/HomePage";
import ActivityDetails from "../../../features/activities/details/ActivityDetails";

export const router= createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {path: '/', element: <HomePage/>},
            {path: 'activities', element: <ActivityDashboard/>},
            {path: 'activities/:id', element: <ActivityDetails/>},
            {path: 'createActivity', element: <ActivityForm/>},
            {path: 'manage/:id', element: <ActivityForm/>}
        ]
    }
]);