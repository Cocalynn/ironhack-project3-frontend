import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import appConfig from "../config/app-config.json";
import axios from "axios";

const VideoPlayer = ({ courseId, chapters, chapterId, initialChapterIndex = 0 }) => {
  const session = useSelector((state) => state.session);
  const [currentChapterIndex, setCurrentChapterIndex] =
    useState(initialChapterIndex);

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };

  console.log("this is the current chapter id: ", chapterId);

  const handleChapterWatched = async (chapterId) => {
    try {
      await axios.put(
        `${appConfig.apiUri}/api/${courseId}/chapters/watchChapter/${chapterId}`,
        {},
        config
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className="mb-4 text-center">{chapters[currentChapterIndex].name}</h1>
      <Row>
        <Col lg={8} md={10} sm={12} className="mx-auto mb-4">
          <div className="position-relative" style={{ paddingTop: "56.25%" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${chapters[currentChapterIndex].videoId}`}
              style={{ position: "absolute", top: 0, left: 0 }}
              width="100%"
              height="100%"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-around mt-3">
            {currentChapterIndex > 0 && (
              <Button
                variant="warning"
                onClick={() => setCurrentChapterIndex(currentChapterIndex - 1)}
              >
                <SlArrowLeftCircle /> Previous
              </Button>
            )}
            <Button onClick={() => handleChapterWatched(chapterId)}>
              {chapters[currentChapterIndex].watched
                ? "Mark as Unwatched"
                : "Mark as Watched"}
            </Button>
            {currentChapterIndex < chapters.length - 1 && (
              <Button
                variant="warning"
                onClick={() => setCurrentChapterIndex(currentChapterIndex + 1)}
              >
                Next <SlArrowRightCircle />
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoPlayer;
