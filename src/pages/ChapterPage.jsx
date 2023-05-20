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

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await axios.get(`${API_URL}/api/chapters/${chapterId}`);
      console.log("Response data:", response.data);
      setChapter(response.data);
    };

    fetchChapter();
  }, [chapterId]);

  if (!chapter) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  let videoId = chapter.youtubeId;

  console.log("Video ID:", videoId);

  return (
    <Container className="d-flex flex-column align-items-center py-3">
      <Button
        as={Link}
        to={`/courses/${chapter.course}`}
        className="mb-3 btn-sm"
      >
        <FiArrowLeftCircle /> Back to Course
      </Button>
      <h1 className="mb-4 text-center">{chapter.name}</h1>
      <VideoPlayer videos={[videoId]} />
    </Container>
  );
};

export default ChapterPage;
