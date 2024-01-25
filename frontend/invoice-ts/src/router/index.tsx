import { createBrowserRouter } from "react-router-dom";
import MyLayout from "../pages/Layout/MyLayout";
import Launch from "../pages/Launch/Launch";
import Statistic from "../pages/Statistic/Statistic";
import Result from "../pages/Result/Result";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import AuthRoute from "../pages/AuthRoute/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <MyLayout />
      </AuthRoute>
    ),
    children: [
      { index: true, element: <Statistic /> },
      { path: "/launch", element: <Launch /> },
      { path: "/result", element: <Result /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
