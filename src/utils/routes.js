import Admin from "../pages/Admin";
import {
    ADMIN_ROUTE,
    AUTO_ROUTE,
    CARSHARING_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_CARS_ROUTE, USER_RENTED_CARS_ROUTE,
    USER_ROUTE
} from "./consts";
import Carsharing from "../pages/Carsharing";
import Auth from "../pages/Auth";
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
        Component : Carsharing
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
        Component : Admin
    },
]

export const publicRoutes = [
    {
        path : LOGIN_ROUTE,
        Component : Auth
    },
    {
        path : REGISTRATION_ROUTE,
        Component : Auth
    },
]