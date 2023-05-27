import React from "react";
import FootBar from "../components/FootBar";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import appConfig from "../config/app-config.json";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { Paper } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import jsPDF from "jspdf";
import img from "../assets/images/certificate-background.png";
import { Button } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { CircularProgress } from "@mui/material";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function LearnPage() {
  const session = JSON.parse(localStorage.getItem("session"));
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [nickname, setNickname] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };

  // Get current user nickname
  axios
    .get(`${appConfig.apiUri}/user`, config)
    .then((response) => {
      setNickname(response.data.nickname);
    })
    .catch((error) => {
      console.log(error);
    });

  // get all registered courses
  useEffect(() => {
    axios
      .get(`${appConfig.apiUri}/user/registered-courses`, config)
      .then((response) => {
        console.log(response.data);
        setRegisteredCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const generateCertificate = (nickname, finishedCourse) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add background image
    doc.addImage(
      img,
      "PNG",
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight()
    );

    // Add recipient name
    doc.setFontSize(36);
    doc.setFont("helvetica"); // Change the font family and style
    doc.text(nickname, 105, 160, { align: "center" }); // get the nick name from mongoDB database

    // Add course name
    doc.setFontSize(20);
    doc.text(finishedCourse, 105, 195, { align: "center" }); // get the course name from mongoDB database

    // Save the PDF
    doc.save("certificate.pdf");
  };

  return (
    <div>
      {registeredCourses.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="70vh"
        >
          <Paper elevation={3} style={{ padding: "30px", textAlign: "center" }}>
            <Typography
              variant="h5"
              component="div"
              style={{ marginBottom: "20px" }}
            >
              No courses found
            </Typography>
            <Typography variant="body1" color="textSecondary">
              You have not registered for any courses yet. Browse our course
              selection and start learning today.
            </Typography>
          </Paper>
        </Box>
      ) : (
        <Box m={3}>
          <Grid container spacing={3}>
            {registeredCourses.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Link
                      component={RouterLink}
                      to={`/courses/${course.course._id}`}
                      variant="body2"
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                      >
                        {course.course.name}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {course.course.description}
                    </Typography>
                  </CardContent>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                  >
                    <CircularProgressWithLabel
                      value={course.progress}
                      color="primary"
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<WorkspacePremiumIcon />}
                      onClick={() =>
                        generateCertificate(nickname, course.course.name)
                      }
                      disabled={course.progress !== 100}
                    >
                      GET CERTIFICATE
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          "@media (min-width: 600px)": {
            width: "600px",
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <FootBar />
      </Box>
    </div>
  );
}

export default LearnPage;
