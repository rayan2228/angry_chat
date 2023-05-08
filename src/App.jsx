import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SingUp />,
  },
  {
    path: "singin",
    element: <SingIn />,
  },
  {
    path: "forgetpassword",
    element: <ForgetPassword/>,
  },
  {
    path: "home",
    element: <Home/>,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
