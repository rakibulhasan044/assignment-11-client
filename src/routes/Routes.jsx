import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Rooms from "../pages/Rooms";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";


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
            },
            {
                path: '/my-bookings',
                element: <MyBookings/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
])

export default router;