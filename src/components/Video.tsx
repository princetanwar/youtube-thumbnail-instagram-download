import React, { useEffect, useState } from "react";

interface Props {
  videoLink: string;
}

const Video = ({ videoLink }: Props) => {
  const [videoBlob, setvideoBlob] = useState("");
  useEffect(() => {
    fetch(videoLink)
      .then((res) => res.blob())
      .then((blob) => setvideoBlob(URL.createObjectURL(blob)));
  }, []);
  return (
    <a
      href={videoBlob}
      target="_blank"
      className="btn btn-secondary mb-2 mt-2"
      download
      rel="noopener noreferrer"
      style={{ display: "inherit" }}
    >
      Download video
    </a>
  );
};

export default Video;
