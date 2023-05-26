import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

function WishlistCourseCard(props) {
  return (
    <Card>
      <Box display="flex">
        <Box sx={{ width: '140px', height: '140px', p:2 }}>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '100%', objectFit: 'fill', boxSizing: 'border-box' }}
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
        <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" color="text.primary" mr={3}>
              {props.price}€
            </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default WishlistCourseCard;
