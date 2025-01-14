import "./App.css";
import React, { Suspense } from "react";

const Landing_page = React.lazy(() => import("./landing page/Landing_page"));
const Home = React.lazy(() => import("./Homepage/Home"));
const Sign_in = React.lazy(() => import("./sign-in/Sign_in"));
const Sign_up = React.lazy(() => import("./sign-up/Sign_up"));
const Project = React.lazy(() => import("./Homepage/components/Project"));
const Teamproject = React.lazy(() => import("./Homepage/components/teamProject"));
const Uploadedproject = React.lazy(() => import("./Homepage/components/uploadedProject"));
const Projecttemplate = React.lazy(() => import("./Homepage/components/projectTemplate"));
const ForgetPassword = React.lazy(()=> import("./Forgetpassword/Forgetpassword"))

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing_page />} />
            <Route path="/sign-in" element={<Sign_in />} />
            <Route path="/sign-up" element={<Sign_up />} />
            <Route path="/forgetpassword" element={<ForgetPassword/>}/>
            <Route path="/home" element={<Home />}>
              <Route index element={<Project />} />
              <Route path="team-project" element={<Teamproject />} />
              <Route path="upload-project" element={<Uploadedproject />} />
              <Route path="project-template" element={<Projecttemplate />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;
