import { useState } from "react";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1); // hook
  const { loading, error, videos, hasMore } = useVideoList(page); // custome hook
  return (
    <div className={classes.videos}>
      {videos.length > 0 &&
        videos.map((video) =>
          video.noq > 0 ? (
            <Link to={`/quiz/${video.youtubeID}`} key={video.youtubeID}>
              <Video title={video.title} id={video.youtubeID} noq={video.noq} />
            </Link>
          ) : (
            <Video
              title={video.title}
              id={video.youtubeID}
              noq={video.noq}
              key={video.youtubeID}
            />
          )
        )}

      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
