import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log("Chapters:", props.chapters);
    this.state = {
      currentChapterIndex: props.currentChapterIndex || 0,
    };
  }

  handleNext = () => {
    this.setState((prevState) => ({
      currentChapterIndex: prevState.currentChapterIndex + 1,
    }));
  };

  handlePrevious = () => {
    this.setState((prevState) => ({
      currentChapterIndex: prevState.currentChapterIndex - 1,
    }));
  };

  render() {
    const { currentChapterIndex } = this.state;
    const { chapters } = this.props; // array of YouTube video IDs

    return (
      <Container>
        <h1 className="mb-4 text-center">
          {chapters[currentChapterIndex].name}
        </h1>
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
                <Button variant="warning" onClick={this.handlePrevious}>
                  <SlArrowLeftCircle /> Previous
                </Button>
              )}
              <Button onClick={this.handleMarkAsDone}>Mark Done</Button>
              {currentChapterIndex < chapters.length - 1 && (
                <Button variant="warning" onClick={this.handleNext}>
                  Next <SlArrowRightCircle />
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default VideoPlayer;
