import React from "react";
import { Row, Col } from "reactstrap";

import Image from "./Image";
const ImageGrid = (props) => {
  const { high, low, max, medium } = props.images;

  return (
    <>
      <Row>
        <Col lg="6">
          <Image imageLink={max} qulity="1080" />
        </Col>
        <Col lg="6">
          <Image imageLink={high} qulity="720" />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <Image imageLink={medium} qulity="480" />
        </Col>
        <Col lg="6">
          <Image imageLink={low} qulity="360" />
        </Col>
      </Row>
    </>
  );
};

export default ImageGrid;
