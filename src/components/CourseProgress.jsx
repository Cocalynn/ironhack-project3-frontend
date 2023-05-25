import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";


const CourseProgress = ({ totalChapters, watchedChapters }) => {
  const completedChapters =
    Object.values(watchedChapters).filter(Boolean).length;
  const progress =
    totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

  return (
    <div style={{ margin: "20px" }}>
      <h2>Course Progress</h2>
      <ProgressBar now={progress} label={`${progress.toFixed(1)}%`} />
    </div>
  );
};

export default CourseProgress;
