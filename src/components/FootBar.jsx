import ExploreIcon from '@mui/icons-material/Explore';
import SchoolIcon from '@mui/icons-material/School';
import FaceIcon from '@mui/icons-material/Face';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import axios from 'axios';
import appConfig from '../config/app-config.json';
import { useSelector } from "react-redux";



export default function FootBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const lecturers = ["Diogo", "Dani", "Jaime"] // Hardcoding now, may be updated later

  // get current user and check if he is a lecturer
  const [isLecturer, setIsLecturer] = React.useState(false);

  const session = useSelector((state) => state.session);
  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`
    }
  }

  axios.get(`${appConfig.apiUri}/user`, config)
    .then((response) => {
      if (lecturers.includes(response.data.name)) {
        setIsLecturer(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });




  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
            <BottomNavigationAction
              component={Link} 
              to="/courses"
              label="Explore"
              value="Explore"
              icon={<ExploreIcon />}
            />

            { !isLecturer && 
              <BottomNavigationAction
                component={Link}
                to="/learn" // To be updated to learn course
                label="Learn"
                value="Learn"
                icon={<SchoolIcon />}
              />
            }

            { isLecturer &&
              <BottomNavigationAction
                component={Link}
                to="/" // To be updated to upload course
                label="Upload"
                value="Upload"
                icon={<CloudUploadIcon />}
              />
            }

            <BottomNavigationAction
              component={Link}
              to="/"
              label="Profile"
              value="Profile"
              icon={<FaceIcon />}
            />

          </BottomNavigation>
      </Paper>
    </Box>
  );
}

