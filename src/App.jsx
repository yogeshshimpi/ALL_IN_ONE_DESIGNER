import "./App.css";
import Home from "./Home page/Home";
import Landing_page from "./landing page/Landing_page";
import Sign_in from "./sign-in/Sign_in";
import Sign_up from "./sign-up/Sign_up";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

const App =  () => {
    const router =  createBrowserRouter([
      {
        path:'/',
        element:<Landing_page/>
      },
      {
        path:'/sign-up',
        element:<Sign_up/>
      },
      {
        path:'/sign-in',
        element:<Sign_in/>
      },
      {
        path:'/home',
        element:<Home/>
      },
    ])
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
