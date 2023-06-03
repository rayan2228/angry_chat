import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Friends from "./pages/Friends";
import People from "./pages/People";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";
import EmailVerified from "./pages/EmailVerified";

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
    path: "emailVerified",
    element: <EmailVerified />,
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
    element: <Friends />,
  },
  {
    path: "groups",
    element: <Groups />,
  },
  {
    path: "people",
    element: <People />,
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
