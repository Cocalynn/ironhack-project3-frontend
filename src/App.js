import React from "react";
import { Router, Route } from "react-router-dom";
import Callback from "./routes/Callback";
import Home from "./routes/Home";
import AddCoursePage from "./pages/AddCoursePage";
import AllCoursesPage from "./pages/AllCoursesPage";
import CoursePage from "./pages/CoursePage";
import LecturerPage from "./pages/LecturerPage";
import NavBar from "./components/NavBar";
import FooterBar from './components/FooterBar'

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = () => (
  <>
    <Router history={history}>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/callback" component={Callback} />
      <Route exact path="/courses" component={AllCoursesPage} />
      <Route exact path="/courses/:courseId" component={CoursePage} />
      <Route exact path="/courses/newcourse" component={AddCoursePage} />
      <Route exact path="/lecturers/:lecturerId" component={LecturerPage} />
      <FooterBar />
    </Router>

  </>
);

export default App;
