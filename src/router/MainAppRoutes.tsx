import MainLayout from "../layout/MainLayout/index";
import Home from "../views/Home";
import MyReservation from "../views/Reservations";
import RoomDetails from "../views/RoomDetails";
import { Rooms } from "../views/Rooms";
import SignUp from "../views/Signup";

export function MainAppRoutes() {
  const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/room-details/:id?",
        element: <RoomDetails />,
      },
      {
        path: "/my-reservations",
        element: <MyReservation />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  };

  return MainRoutes;
}
