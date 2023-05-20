import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:3010";

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
    return <div>Loading...</div>;
  }

  // Helper function to extract YouTube video ID
  const extractVideoId = (youtubeLink) => {
    const regex = /[?&]v=([^&#]*)/i;
    const match = youtubeLink.match(regex);
    return match && match[1] ? match[1] : "";
  };

  // extract YouTube video ID from chapter link
  let videoId = "";
  if (chapter.youtubeId) {
    videoId = extractVideoId(chapter.youtubeId);
  }
  console.log("Extracted video ID:", videoId);

  return (
    <div>
      <h1>{chapter.name}</h1>
      <VideoPlayer videos={[videoId]} />
    </div>
  );
};

export default ChapterPage;
