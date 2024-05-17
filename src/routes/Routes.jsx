import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Room from "../pages/Room";



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
                element: <Room/>,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/roomsCount`)
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