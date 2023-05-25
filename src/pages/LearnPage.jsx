import React from 'react'
import FootBar from '../components/FootBar'
import { Box } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import appConfig from '../config/app-config.json'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'
import { Grid } from '@mui/material'
import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import { Typography } from '@mui/material'



function LearnPage() {

    const session = JSON.parse(localStorage.getItem('session'));
    const [registeredCourses, setRegisteredCourses] = useState([]);

    const config = {
        headers: {
        Authorization: `Bearer ${session.credentials.accessToken}`,
        },
    };


    useEffect(() => {
        axios.get(`${appConfig.apiUri}/user/registered-courses`, config)
        .then((response) => {
            console.log(response.data);
            setRegisteredCourses(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []); 

    return (
        <div>
            
            {registeredCourses.length === 0 ? (
          <Typography variant="h5" component="div">
            No courses found
          </Typography>
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
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      {course.course.price}€
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
        )}
            <Box sx={{
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    '@media (min-width: 600px)': {
                    width: '600px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    }}}>
                <FootBar />
            </Box>
            
        </div>
    )
}

export default LearnPage