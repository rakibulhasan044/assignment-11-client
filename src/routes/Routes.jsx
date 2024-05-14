import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Rooms from "../pages/Rooms";
import MyBookings from "../pages/MyBookings";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/rooms',
                element: <Rooms/>
            }, {
                path: '/my-bookings',
                element: <MyBookings/>
            }
        ]
    }
])

export default router;