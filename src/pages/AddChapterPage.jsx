import { useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
const API_URL = "http://localhost:3010";

const AddChapterForm = () => {
  const { courseId } = useParams();
  const [chapterData, setChapterData] = useState({
    name: "",
    description: "",
    youtubeId: "",
  });

  const handleChange = (event) => {
    setChapterData({ ...chapterData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("courseId: ", courseId);
    try {
      // Add the chapter to the course by making a POST request to the server
      await axios.post(
        `${API_URL}/api/courses/${courseId}/chapters`,
        chapterData
      );
      // Clear the form fields
      setChapterData({
        name: "",
        description: "",
        youtubeId: "",
      });
    } catch (error) {
      console.error("Failed to add chapter", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="chapterName">
        <Form.Label>Chapter Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={chapterData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="chapterDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={chapterData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="chapterLink">
        <Form.Label>YouTube Video ID</Form.Label>
        <Form.Control
          type="text"
          name="youtubeId"
          value={chapterData.link}
          onChange={handleChange}
          required
          placeholder="Enter the ID of the YouTube video (e.g., dQw4w9WgXcQ)"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Chapter
      </Button>
    </Form>
  );
};

export default AddChapterForm;
