import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import appConfig from "../config/app-config.json";
import CourseSearch from "../components/CourseSearch";
import FootBar from "../components/FootBar";
import Box from '@mui/material/Box';
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";

const AllCoursesPage = () => {
  const session = JSON.parse(localStorage.getItem('session'));

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLecturer, setIsLecturer] = useState(false);
  const lecturers = ["DiogoBarros", "DanielCalvente", "JaimeLaureano"] 


  // Get all courses
  const getAllCourses = () => {
    setIsLoading(true);
    axios
      .get(`${appConfig.apiUri}/api/courses`, config)
      .then((response) => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  // get current user and check if he is a lecturer
  axios.get(`${appConfig.apiUri}/user`, config)
  .then((response) => {
    if (lecturers.includes(response.data.username)) {
      setIsLecturer(true);
    }
  })
  .catch((error) => {
    console.log(error)
  })

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        paddingBottom: "60px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CourseSearch setCourses={setCourses} />
        {isLecturer && (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center"
          >
            <Button 
              component={RouterLink} 
              to="/add-course" 
              variant="contained" 
              sx={{ 
                mb: 2,
                '&:hover': {
                  color: 'white',
                  transform: 'scale(1.05)', 
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            >
              Add New Course
            </Button>
          </Box>
        )}
        {courses.length === 0 ? (
          <Typography variant="h5" component="div">
            No courses found
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Link
                      component={RouterLink}
                      to={`/courses/${course._id}`}
                      variant="body2"
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                      >
                        {course.name}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      {course.price} €
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <FootBar />
    </Box>
  );
};

export default AllCoursesPage;
