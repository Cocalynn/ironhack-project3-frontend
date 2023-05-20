import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from "react-router-dom";

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
    return <div>Loading...</div>;
  }

  // As you already have the video ID, you don't need to extract it anymore.
  let videoId = chapter.youtubeId;

  console.log("Video ID:", videoId);

  return (
    <div>
      <h1>{chapter.name}</h1>
      <VideoPlayer videos={[videoId]} />
    </div>
  );
};

export default ChapterPage;
