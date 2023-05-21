import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

function WishlistCourseCard(props) {
  return (
    <Card>
      <Box display="flex" border={1} borderColor="white" bgcolor="background.default">
        <Box sx={{ width: '140px', height: '140px' }}>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              <strong>{props.lecturer}</strong>
            </Typography>

          </Box>
        </CardContent>
        <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" color="text.primary">
              ${props.price}
            </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default WishlistCourseCard;
