import React from "react";
import { useState } from "react";
import axios from "axios";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import appConfig from "../config/app-config.json";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const CourseSearch = ({ setCourses }) => {
  const session = JSON.parse(localStorage.getItem('session'));

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Make a request to the server with the search term
    if (searchTerm !== "") {
      axios
        .get(`${appConfig.apiUri}/api/search`, {
          ...config,
          params: { term: searchTerm },
        })
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      // If search term is empty, fetch all courses again
      axios
        .get(`${appConfig.apiUri}/api/courses`, config)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleClearSearch = () => {
    // Clear the search input and fetch all courses again
    setSearchTerm("");
    axios
      .get(`${appConfig.apiUri}/api/courses`, config)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} lg={6}>
        <form onSubmit={handleSearch}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#ff593b",
                color: "#fff",
                outline: "none",
                border: "none",
              }}
            >
              Search
            </Button>
            <Button
              variant="secondary"
              type="button"
              style={{
                marginLeft: "10px",
                outline: "none",
                border: "none",
              }}
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </InputGroup>
        </form>
      </Col>
    </Row>
  );
};

export default CourseSearch;
