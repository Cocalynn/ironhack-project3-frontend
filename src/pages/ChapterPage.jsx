import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { FiArrowLeftCircle } from "react-icons/fi";

const API_URL = "http://localhost:5005";

const ChapterPage = () => {
  const { chapterId } = useParams();
  console.log("chapterId:", chapterId);
  const [chapter, setChapter] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await axios.get(`${API_URL}/api/chapters/${chapterId}`);
      console.log("Response data:", response.data);
      setChapter(response.data);

      // Fetch the course information to get all chapters
      const courseResponse = await axios.get(
        `${API_URL}/api/courses/${response.data.course}`
      );
      setCourse(courseResponse.data);
    };

    fetchChapter();
  }, [chapterId]);

  if (!chapter || !course) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Get an array of chapters with YouTube video IDs and names
  let chapters = course.chapters.map((ch) => ({
    videoId: ch.youtubeId,
    name: ch.name,
  }));

  // Get the index of the current chapter
  let currentChapterIndex = course.chapters.findIndex(
    (ch) => ch._id === chapterId
  );

  return (
    <Container className="d-flex flex-column align-items-center py-3">
      <Button
        as={Link}
        to={`/courses/${chapter.course}`}
        className="mb-3 btn-sm"
      >
        <FiArrowLeftCircle /> Back to Course
      </Button>
      <VideoPlayer
        chapters={chapters}
        currentChapterIndex={currentChapterIndex}
      />
    </Container>
  );
};

export default ChapterPage;
