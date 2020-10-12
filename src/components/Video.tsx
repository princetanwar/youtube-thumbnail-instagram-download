import React from "react";

interface Props{
  videoLink : string
}

const Video = ({ videoLink } :Props) => {
  return (
    <div className="videoContainer">
      <video width="320" height="240" controls>
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
