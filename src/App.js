import React from "react";
import { Router, Route } from "react-router-dom";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
import AddCoursePage from "./pages/AddCoursePage";
import AllCoursesPage from "./pages/AllCoursesPage";
import CoursePage from "./pages/CoursePage";
import LecturerPage from "./pages/LecturerPage";
import AddChapterPage from "./pages/AddChapterPage";
import ChapterPage from "./pages/ChapterPage";
import LearnPage from "./pages/LearnPage";
import { createTheme, ThemeProvider } from '@mui/material';


import { createBrowserHistory } from "history";

const history = createBrowserHistory();

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff593b', // Logo color
    },
    background: {
      default: '#121212', // Background color
      paper: '#1E1E1E', // Paper color
    },
    text: {
      primary: '#FFFFFF', // White text color for readability
      secondary: '#BDBDBD', // Light gray secondary text color

      
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Choose a suitable font family
  },
  components: {
    // Override specific components if needed
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded button corners
        },
      },
    },
  },
});


const App = () => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route exact path="/callback" component={Callback} />
      <Route exact path="/add-course" component={AddCoursePage} />
      <Route exact path="/courses" component={AllCoursesPage} />
      <Route exact path="/learn-courses" component={LearnPage} />
      <Route exact path="/courses/:courseId" component={CoursePage} />
      <Route exact path="/add-chapter/:courseId" component={AddChapterPage} />
      <Route exact path="/lecturers/:lecturerId" component={LecturerPage} />
      <Route
        exact
        path="/courses/:courseId/chapters/:chapterId"
        component={ChapterPage}
      />
    </Router>
  </ThemeProvider>
);

export default App;
