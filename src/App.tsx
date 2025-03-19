import { RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { router } from "./lib/router";

export default function App() {
  return (
    <UserContextProvider> 
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}