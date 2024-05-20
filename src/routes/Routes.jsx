import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Room from "../pages/Room";
import DetailsRoom from "../pages/DetailsRoom";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import ContactUs from "../pages/ContactUs";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
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
                element: <PrivateRoute>
                    <MyBookings/>
                </PrivateRoute>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            // loader: ({ params }) =>
            //     fetch(`https://10-assignment-server-five.vercel.app/crafts/${params.id}`),
            {
                path: '/room-details/:id',
                element: <PrivateRoute>
                    <DetailsRoom/>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.id}`)

            },
            {
                path: '/contact',
                element: <ContactUs/>
            }
        ]
    }
])

export default router;