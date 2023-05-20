import React from "react";
import YouTube from "react-youtube";
import { Button, Container } from "react-bootstrap";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log("Videos:", props.videos);
    this.state = {
      currentVideoIndex: 0,
    };
  }

  handleNext = () => {
    this.setState((prevState) => ({
      currentVideoIndex: prevState.currentVideoIndex + 1,
    }));
  };

  handlePrevious = () => {
    this.setState((prevState) => ({
      currentVideoIndex: prevState.currentVideoIndex - 1,
    }));
  };

  handleComplete = () => {
    // Here you would handle course completion.
    // This might involve updating the user's progress on the backend.
    console.log("Course completed!");
  };

  render() {
    const { currentVideoIndex } = this.state;
    const { videos } = this.props; // array of YouTube video IDs

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
        <div style={{ width: opts.width, display: "block", margin: "auto" }}>
          <YouTube videoId={videos[currentVideoIndex]} opts={opts} />
        </div>
        <div className="mt-3">
          {currentVideoIndex > 0 && (
            <Button onClick={this.handlePrevious}>Previous</Button>
          )}
          {currentVideoIndex < videos.length - 1 ? (
            <Button onClick={this.handleNext}>Next</Button>
          ) : (
            <Button onClick={this.handleComplete}>Mark Course Complete</Button>
          )}
        </div>
      </Container>
    );
  }
}

export default VideoPlayer;
