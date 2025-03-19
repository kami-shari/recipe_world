import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import MyRecipes from "../pages/MyRecipes";
import Layout from "../components/Layout";
import AddRecipePage from "../pages/AddRecipe";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProfilePage from "../pages/Profile";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-recipes",
        element: <MyRecipes />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/add-recipe",
        element: <AddRecipePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register", 
        element: <RegisterPage />, 
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
    ],
  },
]);
