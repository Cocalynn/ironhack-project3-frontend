// we inly need thi file for reference now
import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';

export default function CourseCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <Link to="/courses/${props.userId}" style={{ textDecoration: 'none' }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={props.image}
                alt={props.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Link>

      {/* click the lecturer button to see the lecturer's profile */}
        <Link to="/profile/${props.lecturerId}" style={{ textDecoration: 'none' }}>
            <CardActions>
                <Box display="flex" alignItems="center">
                    <Avatar
                    alt={props.lecturer}
                    src={props.lecturerImage}
                    sx={{ width: 40, height: 40, marginRight: 1 }}
                    />
                    <Typography variant="subtitle2" color="text.secondary">
                    By <strong>{props.lecturer}</strong>
                    </Typography>
                </Box>
            </CardActions>
        </Link>
    </Card>
  );
}