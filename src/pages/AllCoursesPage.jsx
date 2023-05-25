import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import appConfig from "../config/app-config.json";
import CourseSearch from "../components/CourseSearch";
import FootBar from "../components/FootBar";
import {
  Button,
  Box,
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
        <Button component={RouterLink} to="/add-course" variant="contained">
          Add New Course
        </Button>
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
                      {course.price}€
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
