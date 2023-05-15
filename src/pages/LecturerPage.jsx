import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005";

const LecturerPage = () => {
  const [lecturer, setLecturer] = useState(null);
  const { lecturerId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/lecturers/${lecturerId}`)
      .then((response) => {
        const lecturerData = response.data;
        console.log(lecturerData); // log the lecturerData object
        setLecturer(lecturerData);
      })
      .catch((error) => console.log(error));
  }, [lecturerId]);

  return (
    <div className="container">
      <div>LecturerPage</div>
      {lecturer && (
        <div className="container">
          <h1>{lecturer.name}</h1>
          <p>
            Expertise: <br />
            {lecturer.expertise.join(", ")}
          </p>
          <p>
            Biography: <br />
            {lecturer.bio}
          </p>
          <p>
            Email: <br />
            {lecturer.email}
          </p>
          {lecturer.courses.length > 0 && (
            <div>
              <h2>Courses taught by {lecturer.name}</h2>
              <ul>
                {lecturer.courses.map((course) => (
                  <li key={course._id}>
                    <p>
                      <Link to={`/courses/${course._id}`}>{course.name}</Link>
                    </p>
                    <p>{course.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LecturerPage;
