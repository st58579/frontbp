import AdminPage from "../pages/AdminPage";
import {
    ADMIN_ROUTE,
    AUTO_ROUTE,
    CARSHARING_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_CARS_ROUTE, USER_RENTED_CARS_ROUTE,
    USER_ROUTE
} from "./consts";
import CarsharingPage from "../pages/CarsharingPage";
import AuthPage from "../pages/AuthPage";
import AutoPage from "../pages/AutoPage";
import UserPage from "../pages/UserPage";
import UserCarsPage from "../pages/UserCarsPage";
import UserRentedCarsPage from "../pages/UserRentedCarsPage";

export const authRoutes = [
    {
        path : AUTO_ROUTE + '/:id',
        Component : AutoPage
    },
    {
        path : CARSHARING_ROUTE,
        Component : CarsharingPage
    },
    {
        path: USER_ROUTE + '/:username',
        Component : UserPage
    },
    {
        path: USER_CARS_ROUTE,
        Component : UserCarsPage
    },
    {
        path: USER_RENTED_CARS_ROUTE,
        Component : UserRentedCarsPage
    }
]
export const adminRoutes = [
    {
        path : ADMIN_ROUTE,
        Component : AdminPage
    },
]

export const publicRoutes = [
    {
        path : LOGIN_ROUTE,
        Component : AuthPage
    },
    {
        path : REGISTRATION_ROUTE,
        Component : AuthPage
    },
]