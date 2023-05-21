import React from 'react';
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box } from '@mui/material';

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

function RegisteredCourseCard(props) {
  return (
    <Card>
      <Box display="flex">
        <Box sx={{ width: '140px', height: '140px', p:2 }}>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', boxSizing: 'border-box' }}
            image={props.image}
            alt={props.title}
          />
        </Box>
        <CardContent>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="left">
            <Typography variant="h6" component="div" color="text.primary">
              <strong>{props.title}</strong>
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              By <strong>{props.lecturer}</strong>
            </Typography>
          </Box>
        </CardContent>
        <Box display="flex" alignItems="center" mr={2}>
          <CircularProgressWithLabel value={props.progress} color="primary" />
        </Box>
      </Box>
    </Card>
  );
}

export default RegisteredCourseCard;
