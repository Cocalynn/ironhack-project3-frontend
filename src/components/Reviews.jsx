import React from "react";
import { Card } from "react-bootstrap";

const starFull = "★";
const starEmpty = "☆";

const generateStars = (rating) => {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? starFull : starEmpty;
  }
  return stars;
};

const Reviews = ({ reviews }) => (
  <div>
    {reviews.slice(0, 5).map((review, index) => (
      <Card key={index} style={{ marginTop: "10px" }}>
        <Card.Body>
          <Card.Text>
            <div style={{ color: "#f4c150", fontSize: "1.2em" }}>
              {generateStars(review.rating)}
            </div>
          </Card.Text>
          <Card.Text>{review.comment}</Card.Text>
          <Card.Footer>- {review.user.username || "Anonymous"}</Card.Footer>
        </Card.Body>
      </Card>
    ))}
  </div>
);

export default Reviews;
