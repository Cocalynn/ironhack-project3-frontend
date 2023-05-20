import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";

const API_URL = "http://localhost:5005";

const CourseProgress = ({ userId, courseId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users/${userId}`)
      .then((response) => {
        const userCourse = response.data.courses.find(
          (course) => course.course._id === courseId
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
  }, [userId, courseId]);

  return (
    <div>
      <h2>Course Progress</h2>
      <ProgressBar now={progress} label={`${progress.toFixed(1)}%`} />
    </div>
  );
};

export default CourseProgress;
