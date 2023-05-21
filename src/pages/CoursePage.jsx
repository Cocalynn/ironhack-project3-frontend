import axios from "axios";
import React from "react";
import ReviewForm from "../components/ReviewForm";
import CourseProgress from "../components/CourseProgress";
import Reviews from "../components/Reviews";
import defaultProfileImg from "../assets/images/default-profile-img.png";
import defaultCourseImg from "../assets/images/course-default-image.webp";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Image, Row, Col, Button } from "react-bootstrap";

const API_URL = "http://localhost:3010";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const isCourseCompleted =
    course &&
    (course.chapters.length === 0 ||
      course.chapters.length === course.totalChapters);

  const { courseId } = useParams();

  const getCourse = () => {
    axios
      .get(`${API_URL}/api/courses/${courseId}`)
      .then((response) => {
        const oneCourse = response.data;
        setCourse(oneCourse);

        axios
          .get(`${API_URL}/api/lecturers/${oneCourse.lecturer}`)
          .then((lecturerResponse) => {
            const lecturerData = lecturerResponse.data;
            setLecturer(lecturerData);
          })
          .catch((error) => console.log(error));

        axios
          .get(`${API_URL}/api/reviews/course/${courseId}`)
          .then((reviewResponse) => {
            const reviewData = reviewResponse.data;
            setReviews(reviewData);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCourse();
  }, []);

  console.log(lecturer);

  // Checkout
  const checkout = () => {
    axios
      .post(`${API_URL}/api/checkout`, { courseId }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data.url
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="container">
      {course && (
        <>
          <Row>
            <Col xs={12} lg={8}>
              <Card style={{ marginBottom: "15px" }}>
                <Card.Img src={defaultCourseImg} />
                <hr />
                <Card.Body>
                  <Card.Title>
                    <h1>{course.name}</h1>
                  </Card.Title>
                  <Card.Text>
                    <>
                      <span>{course.description}</span>
                    </>
                  </Card.Text>
                  <Card.Text>
                    <span>
                      <Badge variant="primary">${course.price}</Badge>
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
              <div>
                  <Button variant="primary" type="submit" onClick={checkout}>
                    Checkout
                  </Button>


                <Button variant="warning">Add to Wishlist</Button>
              </div>
            </Col>

            <Col xs={12} lg={4}>
              {lecturer && (
                <Card style={{ marginBottom: "15px" }}>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Image
                        src={defaultProfileImg || lecturer.profileImage}
                        style={{
                          width: "40px",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                        alt="Profile Image"
                      />
                      <div className="ml-4">
                        <h5 className="mb-0">{lecturer.name}</h5>
                      </div>
                    </div>
                    <Button variant="outline-primary" size="sm">
                      Edit
                    </Button>
                  </Card.Body>
                  <hr />
                  <Card.Body className="d-flex justify-content-between align-items-center bg-light">
                    {/* Show review form only if the course is completed */}
                    <Button as={Link} to={`/add-chapter/${courseId}`}>
                      Add Chapter
                    </Button>
                    {isCourseCompleted ? (
                      <>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={toggleReviewForm}
                        >
                          Leave a Review
                        </Button>
                      </>
                    ) : (
                      <span>
                        Course needs to be completed to leave a review
                      </span>
                    )}
                  </Card.Body>
                  {/* Show review form if it's toggled on */}
                  {showReviewForm && (
                    <Card.Body>
                      <ReviewForm
                        courseId={courseId}
                        toggleReviewForm={toggleReviewForm}
                      />
                    </Card.Body>
                  )}
                </Card>
              )}
              <Reviews reviews={reviews} />
              <CourseProgress courseId={courseId} />
            </Col>
          </Row>
          <Row>
            {course.chapters.map((chapter, index) => (
              <Card key={index} style={{ width: "18rem", margin: "10px" }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-auto">
                    Chapter {index + 1}: {chapter.name}
                  </Card.Title>
                  <Button
                    size="sm"
                    as={Link}
                    to={`/courses/${courseId}/chapters/${chapter._id}`}
                  >
                    Go to Chapter
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default CoursePage;
