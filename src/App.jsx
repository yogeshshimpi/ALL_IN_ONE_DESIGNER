import "./App.css";
import React, { Suspense } from "react";

// Lazy loading components
const Landing_page = React.lazy(() => import("./landing page/Landing_page"));
const Home = React.lazy(() => import("./Home page/Home"));
const Sign_in = React.lazy(() => import("./sign-in/Sign_in"));
const Sign_up = React.lazy(() => import("./sign-up/Sign_up"));
const Project = React.lazy(() => import("./Home page/components/project"));
const Teamproject = React.lazy(() =>import("./Home page/components/teamProject"));
const Uploadedproject = React.lazy(() =>import("./Home page/components/uploadedProject"));
const Projecttemplate = React.lazy(()=> import("./Home page/components/projectTemplate"))

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/sign-in" element={<Sign_in />} />
          <Route path="/sign-up" element={<Sign_up />} />
          <Route path="/home" element={<Home />}>
            <Route path="/home/" element={<Project />} />
            <Route path="/home/team-project" element={<Teamproject/>} />
            <Route path="/home/upload-project" element={<Uploadedproject/>} />
            <Route path="/home/project-template" element={<Projecttemplate/>} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
