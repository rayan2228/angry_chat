import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Firends from "./pages/Firends";
import Pepole from "./pages/Pepole";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";

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
    element: <ForgetPassword />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "chats",
    element: <Chats />,
  },
  {
    path: "friends",
    element: <Firends />,
  },
  {
    path: "groups",
    element: <Groups />,
  },
  {
    path: "pepole",
    element: <Pepole />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
