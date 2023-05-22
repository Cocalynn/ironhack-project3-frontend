import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import axios from "axios";
import appConfig from "../config/app-config.json";
import { useSelector } from "react-redux";

const ReviewForm = ({ courseId, toggleReviewForm }) => {
  const session = useSelector((state) => state.session);

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the review object
    const review = {
      user: session.user.userName,
      rating: rating,
      comment: comment,
      courseId: courseId,
    };

    // Send the review data to the backend API
    axios
      .post(`${appConfig.apiUri}/api/reviews`, review, config)
      .then((response) => {
        console.log("Review submitted:", response.data);
        setRating(0);
        setComment("");
        toggleReviewForm();
      })
      .catch((error) => {
        console.error("Error submitting review:", error.message);
        if (error.response) {
          console.log("Error response from server:", error.response);
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rating">
        <Form.Label>Rating</Form.Label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => handleRatingChange(star)}>
              {star <= rating ? (
                <BsStarFill color="#ffc107" />
              ) : (
                <BsStar color="#ccc" />
              )}
            </span>
          ))}
        </div>
      </Form.Group>
      <Form.Group controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReviewForm;
