import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Statistic from "../pages/Statistic/Statistic";
import Launch from "../pages/Launch/Launch";
import Result from "../pages/Result/Result";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Statistic />,
      },
      {
        path: "/launch",
        element: <Launch />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
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

export default Router;
