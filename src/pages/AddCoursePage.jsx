import React, { useState, useEffect } from "react";
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom";
import axios from "axios";
import appConfig from "../config/app-config.json";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { Form } from "react-bootstrap";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Alert } from "@mui/material";
import formHeader from "../assets/images/form-header.png";

const AddCoursePage = () => {
  const session = JSON.parse(localStorage.getItem('session'));

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };

  const redirect = useHistory();
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
        const response = await axios.get(
          `${appConfig.apiUri}/api/lecturers`,
          config
        );
        setLecturers(response.data);
      } catch (error) {
        console.error("Error fetching lecturers", error);
      }
    };

    fetchLecturers();
  }, []);

  if (showAlert) {
    setShowAlert(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${appConfig.apiUri}/api/courses`,
        course,
        config
      );
      console.log(response.data);
      setShowAlert(true);
      redirect.push(`/courses/${response.data._id}`);
    } catch (error) {
      console.error("Error creating course", error);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Box sx={{ py: 3, textAlign: "center" }}>
              <Typography variant="h4">Create a New Course</Typography>
              <Typography>
                Use the form below to create your own course.
              </Typography>
              <img
                src={formHeader}
                alt="header-img"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>

            {showAlert && (
              <Alert severity="success">Course '{course.name}' created</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={course.name}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                value={course.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
              />

              <Form.Group controlId="courseTags">
                <CreatableSelect
                  isMulti
                  name="tags"
                  components={animatedTags}
                  options={[
                    { value: "javascript", label: "JavaScript" },
                    { value: "react", label: "React" },
                    { value: "nodejs", label: "Node.js" },
                    { value: "ux", label: "UX" },
                    { value: "seo", label: "SEO" },
                  ]}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleTagsChange}
                  styles={{
                    control: (base) => ({
                      ...base,
                      background: "#121212",
                      borderColor: "rgba(0,0,0,0.23)",
                      "&:hover": {
                        borderColor: "#fff",
                      },
                      boxShadow: "none",
                    }),
                    option: (styles, { isFocused, isSelected }) => {
                      return {
                        ...styles,
                        backgroundColor:
                          isFocused || isSelected ? "#3f51b5" : null,
                        color: isFocused || isSelected ? "#fff" : "#000",
                      };
                    },
                  }}
                />
              </Form.Group>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Price"
                    type="number"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Lecturer</InputLabel>
                    <Select
                      name="lecturer"
                      value={course.lecturer}
                      onChange={handleChange}
                    >
                      {lecturers.map((lecturer) => (
                        <MenuItem value={lecturer._id} key={lecturer._id}>
                          {lecturer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddCoursePage;
