import React from "react";
import YouTube from "react-youtube";
import { Button, Container } from "react-bootstrap";
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

    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return (
      <Container className="d-flex flex-column align-items-center">
        <h1 className="mb-4 text-center">
          {chapters[currentChapterIndex].name}
        </h1>
        <div style={{ width: opts.width, display: "block", margin: "auto" }}>
          <YouTube
            videoId={chapters[currentChapterIndex].videoId}
            opts={opts}
          />
        </div>
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
      </Container>
    );
  }
}

export default VideoPlayer;
