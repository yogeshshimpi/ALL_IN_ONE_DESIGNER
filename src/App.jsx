import "./App.css";
import React, { Suspense } from 'react';

// Lazy loading components
const Landing_page = React.lazy(() => import('./landing page/Landing_page'));
const Home = React.lazy(() => import('./Home page/Home'));
const Sign_in = React.lazy(() => import('./sign-in/Sign_in'));
const Sign_up = React.lazy(() => import('./sign-up/Sign_up'));
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
