import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/home-page.component";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
  ]);