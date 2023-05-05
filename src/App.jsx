import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SingUp />,
  },
  {
    path: "singin",
    element: <SingIn />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
