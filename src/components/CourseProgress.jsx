import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import appConfig from "../config/app-config.json";
import { useSelector } from "react-redux";

const CourseProgress = ({ courseId }) => {
  const session = useSelector((state) => state.session);

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };
  const [progress, setProgress] = useState(0);

  console.log(courseId);

  useEffect(() => {
    axios
      .get(`${appConfig.apiUri}/user/`, config)
      .then((response) => {
        console.log("this is the response: ", response);
        const userCourse = response.data.courses.find(
          (course) => course._id === courseId
        );
        if (userCourse) {
          // Calculate overall course progress
          const totalChapters = userCourse.chapters.length;
          const completedChapters = userCourse.chapters.filter(
            (chapter) => chapter.watched
          ).length;
          setProgress((completedChapters / totalChapters) * 100);
        }
      })
      .catch((error) => console.error(error));
  }, [courseId]);

  return (
    <div style={{ margin: "20px" }}>
      <h2>Course Progress</h2>
      <ProgressBar now={progress} label={`${progress.toFixed(1)}%`} />
    </div>
  );
};

export default CourseProgress;
