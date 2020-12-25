import React, { useState } from "react";

import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import nodeUrl from "url";

import Image from "./Image";
import Video from "./Video";
const Instagram = () => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<string | null | undefined>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sendReq = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setVideo(null);
    setImage(null);
    if (url === "") {
      return setErrorMsg("Enter Instagram Url");
    }
    const pars = nodeUrl.parse(url, true);
    if (pars.hostname !== "www.instagram.com")
      return setErrorMsg("Not a Instagram link");

    if (pars.pathname === "/") return setErrorMsg("Enter full Instagram Link");

    try {
      const res = await axios.get(
        `https://www.instagram.com${pars.pathname}?__a=1`
      );
      if (res.data.graphql.shortcode_media.is_video) {
        setVideo(res.data.graphql.shortcode_media.video_url);
      } else {
        setImage(res.data.graphql.shortcode_media.display_resources[2].src);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        setErrorMsg(error.response.data);

        setImage(null);
      }
    }
  };

  return (
    <>
      <h1 className="font-weight-bold text-center mt-4" id="title">
        Instagram image and video Download
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
            placeholder="Enter Instagram Link"
          />
        </FormGroup>
        <Button
          type="submit"
          onClick={sendReq}
          className="btn-lg btn-dark btn-block"
        >
          Get image/video
        </Button>
      </Form>

      {image ? (
        <Image qulity="1080" imageLink={image} size="ok" />
      ) : video ? (
        <Video videoLink={video} />
      ) : (
        <h4 className="text-center text-danger">{errorMsg}</h4>
      )}
    </>
  );
};

export default Instagram;
