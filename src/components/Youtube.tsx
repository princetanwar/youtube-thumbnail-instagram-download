import React, { useState } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import nodeUrl from "url";
import ImageGrid from "./ImageGrid";

const Youtube = () => {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<object | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sendReq = async (e :  React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setImages(null);
    if (url === "") {
      return setErrorMsg("Enter youtube Url");
    }
    const pars = nodeUrl.parse(url, true);
    if ((pars.hostname !== "www.youtube.com") && (pars.hostname !== "youtu.be"))
      return setErrorMsg("Not a youtube link");

    if (pars.hostname === "youtu.be") {
      if (pars.path === "/") return setErrorMsg("Enter full Youtube link");
      setImages({
        max: `https://img.youtube.com/vi${pars.path}/maxresdefault.jpg`,
        high: `https://img.youtube.com/vi${pars.path}/sddefault.jpg`,
        medium: `https://img.youtube.com/vi${pars.path}/hqdefault.jpg`,
        low: `https://img.youtube.com/vi${pars.path}/mqdefault.jpg`,
      });
    }

    if (pars.hostname === "www.youtube.com") {
      const { v } = pars.query;
      if (!v) return setErrorMsg("Enter full Youtube link");
      setImages({
        max: `https://img.youtube.com/vi/${v}/maxresdefault.jpg`,
        high: `https://img.youtube.com/vi/${v}/sddefault.jpg`,
        medium: `https://img.youtube.com/vi/${v}/hqdefault.jpg`,
        low: `https://img.youtube.com/vi/${v}/mqdefault.jpg`,
      });
    }
  };

  return (
    <>
      <h1 className="font-weight-bold text-center mt-4" id="title">
        Youtube Thumbnail image
      </h1>
      <Form className="my-form">
        <h2 className="text-center">Wlcome</h2>
        <FormGroup>
          <Label>Link</Label>
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            type="url"
            placeholder="Enter Youtube Video Link"
          />
        </FormGroup>
        <Button
          type="submit"
          onClick={sendReq}
          className="btn-lg btn-dark btn-block"
        >
          Get Thumbnail
        </Button>
      </Form>

      {images ? (
        <ImageGrid images={images} />
      ) : (
        <h4 className="text-center text-danger">{errorMsg}</h4>
      )}
    </>
  );
};

export default Youtube;
