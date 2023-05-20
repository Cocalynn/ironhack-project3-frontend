import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import axios from "axios";

const API_URL = 'http://localhost:3010'

const ReviewForm = ({ courseId, toggleReviewForm }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the review object
    const review = {
      rating: rating,
      comment: comment,
      courseId: courseId,
    };

    // Send the review data to the backend API
    axios
      .post(`${API_URL}/api/reviews`, review)
      .then((response) => {
        // Review successfully submitted
        // You can add any additional logic here, such as displaying a success message
        // or updating the course details to reflect the new review
        console.log("Review submitted:", response.data);
        // Reset the form values
        setRating(0);
        setComment("");
        // Hide the review form
        toggleReviewForm();
      })
      .catch((error) => {
        // Error occurred while submitting the review
        // You can handle the error here, display an error message, etc.
        console.error("Error submitting review:", error);
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
