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
import { setSession } from '../actions/session';
import { useEffect } from 'react';



export default function FootBar() {

  //const session = JSON.parse(localStorage.getItem('session'));

  const session = JSON.parse(localStorage.getItem('session'));


  // testing
  useEffect(() => {

    if (!session.credentials) {
      console.error('Session credentials are not set');
    } else if (!session.credentials.accessToken) {
      console.error('Access token is not set in session credentials');
    } else {
      // Existing axios request code...
    }
  }, []);
  
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const lecturers = ["DiogoBarros", "DanielCalvente", "JaimeLaureano"] 

  // get current user and check if he is a lecturer
  const [isLecturer, setIsLecturer] = React.useState(false);




  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`
    }
  }

  useEffect(() => {
    axios.get(`${appConfig.apiUri}/user`, config)
      .then((response) => {
        if (lecturers.includes(response.data.username)) {
          setIsLecturer(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);




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
              sx={{
                '&:hover': {
                  color: 'primary.main',  
                }
              }}
            />

            { !isLecturer && 
              <BottomNavigationAction
                component={Link}
                to="/learn-courses" // To be updated to learn course
                label="Learn"
                value="Learn"
                icon={<SchoolIcon />}
                sx={{
                '&:hover': {
                  color: 'primary.main',  
                }
                }}
              />
            }

            { isLecturer &&
              <BottomNavigationAction
                component={Link}
                to="/add-course" // To be updated to upload course
                label="Upload"
                value="Upload"
                icon={<CloudUploadIcon />}
                sx={{
                  '&:hover': {
                    color: 'primary.main',  
                  }
                }}
              />
            }

            <BottomNavigationAction
              component={Link}
              to="/"
              label="Profile"
              value="Profile"
              icon={<FaceIcon />}
              sx={{
                '&:hover': {
                  color: 'primary.main',  
                }
              }}
            />

          </BottomNavigation>
      </Paper>
    </Box>
  );
}

