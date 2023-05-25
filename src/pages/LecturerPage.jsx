import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import appConfig from "../config/app-config.json";
import { useSelector } from "react-redux";

const LecturerPage = () => {
  const session = JSON.parse(localStorage.getItem('session'));

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };
  const [lecturer, setLecturer] = useState(null);
  const { lecturerId } = useParams();

  useEffect(() => {
    axios
      .get(`${appConfig.apiUri}/api/lecturers/${lecturerId}`, config)
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
