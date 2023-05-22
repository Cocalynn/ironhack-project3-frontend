import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconEmpty": {
    color: "#919a9e",
  },
});

const Reviews = ({ reviews }) => (
  <Grid container spacing={2}>
    {reviews.slice(0, 3).map((review, index) => (
      <Grid item xs={12} key={index}>
        <Card
          sx={{ marginTop: 2 }}
          style={{ marginRight: "20px", marginLeft: "20px" }}
        >
          <CardContent>
            <StyledRating name="read-only" value={review.rating} readOnly />
            <Typography variant="body1">{review.comment}</Typography>
            <Typography variant="body1" align="right">
              -{" "}
              {review.user.name ||
                review.user.nickname ||
                review.user.username ||
                "Anonymous"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Reviews;
