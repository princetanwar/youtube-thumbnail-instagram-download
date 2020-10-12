import React from "react";

import { Card, CardImg } from "reactstrap";

interface Props { qulity:string, imageLink:string, size?:string }

const Image = ({ qulity, imageLink, size } : Props) => {
  const imageStyle = size ? { height: 500, maxWidth: 450 } : { height: 320 };
  const cardStyle = size ? { alignItems: "center" } : undefined;
  return (
    <>
      <Card style={cardStyle}>
        <CardImg style={imageStyle} src={imageLink} />

        <a
          href={imageLink}
          target="_blank"
          className="btn btn-secondary mb-2 mt-2"
          download
          rel="noopener noreferrer"
        >
          Download in {qulity}
        </a>
      </Card>
    </>
  );
};

export default Image;
