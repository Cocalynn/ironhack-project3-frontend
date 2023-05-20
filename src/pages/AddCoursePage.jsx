import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import makeAnimated from "react-select/animated";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Image,
} from "react-bootstrap";
import formHeader from "../assets/images/form-header.png";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const API_URL = "http://localhost:3010";

const AddCoursePage = () => {
  const navigate = useHistory();
  const [lecturers, setLecturers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [course, setCourse] = useState({
    name: "",
    description: "",
    price: "",
    lecturer: "",
    tags: [],
  });

  const animatedTags = makeAnimated();

  const handleTagsChange = (selected) => {
    const tagsArray = selected ? selected.map((item) => item.value) : [];
    setCourse({ ...course, tags: tagsArray });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/lecturers`);
        setLecturers(response.data);
      } catch (error) {
        console.error("Error fetching lecturers", error);
      }
    };

    fetchLecturers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/courses`, course);
      console.log(response.data);
      setShowAlert(true);
      setTimeout(() => {
        navigate(`/courses/${response.data._id}`);
      }, 2000);
    } catch (error) {
      console.error("Error creating course", error);
    }
  };
  return (
    <Container className="mb-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Container className="p-3 bg-light text-center">
            <h1 className="mb-3">Create a New Course</h1>
            <p>Use the form below to create your own course.</p>
            <Image src={formHeader} fluid alt="header-img" />
          </Container>

          {showAlert && (
            <Alert
              m-2
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Course `{course.name}` created
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="courseName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={course.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="courseDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={course.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="courseTags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                name="tags"
                components={animatedTags}
                options={[
                  { value: "javascript", label: "JavaScript" },
                  { value: "react", label: "React" },
                  { value: "nodejs", label: "Node.js" },
                  // You can dynamically generate these options based on your needs
                ]}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleTagsChange}
              />
            </Form.Group>

            <Form.Group controlId="coursePrice">
              <Form.Label>Price</Form.Label>
              <div className="input-group custom-input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">€</span>
                </div>
                <Form.Control
                  type="number"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="courseLecturer">
              <Form.Label>Lecturer</Form.Label>
              <Form.Control
                as="select"
                name="lecturer"
                value={course.lecturer}
                onChange={handleChange}
                required
              >
                {lecturers.map((lecturer) => (
                  <option value={lecturer._id} key={lecturer._id}>
                    {lecturer.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCoursePage;
