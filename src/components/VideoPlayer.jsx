import React from "react";
import YouTube from "react-youtube";

class CoursePlayer extends React.Component {
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
        autoplay: 1,
      },
    };

    return (
      <div>
        <YouTube videoId={videos[currentVideoIndex]} opts={opts} />
        {currentVideoIndex > 0 && (
          <button onClick={this.handlePrevious}>Previous</button>
        )}
        {currentVideoIndex < videos.length - 1 ? (
          <button onClick={this.handleNext}>Next</button>
        ) : (
          <button onClick={this.handleComplete}>Mark Course Complete</button>
        )}
      </div>
    );
  }
}

export default CoursePlayer;
