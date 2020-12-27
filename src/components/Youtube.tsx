import axios from "axios";
import React, { useState } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import nodeUrl from "url";
import ImageGrid from "./ImageGrid";

interface sigleUrl {
  audio: boolean;
  url: string;
  type: string;
  quality: string;
  ext: string;
  attr: { class: string };
}
interface res {
  thumb: "";
  meta: { duration: string; source: string; title: string };
  url: sigleUrl[];
}

const Youtube = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<res | null>(null);
  const [images, setImages] = useState<object | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sendReq = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setImages(null);
    if (url === "") {
      return setErrorMsg("Enter youtube Url");
    }
    const pars = nodeUrl.parse(url, true);
    if (pars.hostname !== "www.youtube.com" && pars.hostname !== "youtu.be")
      return setErrorMsg("Not a youtube link");

    axios
      .post("https://y2mate.guru/api/convert", {
        url,
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });

    // if (pars.hostname === "youtu.be") {
    //   if (pars.path === "/") return setErrorMsg("Enter full Youtube link");
    //   setImages({
    //     max: `https://img.youtube.com/vi${pars.path}/maxresdefault.jpg`,
    //     high: `https://img.youtube.com/vi${pars.path}/sddefault.jpg`,
    //     medium: `https://img.youtube.com/vi${pars.path}/hqdefault.jpg`,
    //     low: `https://img.youtube.com/vi${pars.path}/mqdefault.jpg`,
    //   });
    // }

    // if (pars.hostname === "www.youtube.com") {
    //   const { v } = pars.query;
    //   if (!v) return setErrorMsg("Enter full Youtube link");
    //   setImages({
    //     max: `https://img.youtube.com/vi/${v}/maxresdefault.jpg`,
    //     high: `https://img.youtube.com/vi/${v}/sddefault.jpg`,
    //     medium: `https://img.youtube.com/vi/${v}/hqdefault.jpg`,
    //     low: `https://img.youtube.com/vi/${v}/mqdefault.jpg`,
    //   });
    // }
  };

  return (
    <>
      <h1 className="font-weight-bold text-center mt-4" id="title">
        Youtube Video
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
          Get Video
        </Button>
      </Form>

      {data ? (
        <div className="youtube row">
          <img className="yt-img col-12 col-sm-6" src={data.thumb} alt="" />

          <p className="col-12 col-sm-6">
            {" "}
            <span className="mt-2 "> duration {data.meta.duration} </span>{" "}
            <br /> <span className="mt-2">{data.meta.title}</span>
          </p>
          <br />
          <h3 className="col-12">Video Formats</h3>
          <div className="d-flex flex-row col-12 justify-content-around">
            {data.url
              .filter(
                (element) =>
                  element.audio === false && element.attr.class === ""
              )
              .map((element, index) => {
                return (
                  <Button
                    key={index}
                    className="m-2"
                    onClick={() => window.open(element.url)}
                  >
                    {element.quality}
                  </Button>
                );
              })}
          </div>
          <h3 className="col-12">Audio Formats</h3>

          <div className="d-flex flex-row col-12 justify-content-around">
            {data.url
              .filter((element) => element.audio === true)
              .map((element, index) => {
                return (
                  <Button
                    key={index}
                    className="m-2"
                    onClick={() => window.open(element.url)}
                  >
                    {element.ext}
                  </Button>
                );
              })}
          </div>
        </div>
      ) : (
        <h4 className="text-center text-danger">{errorMsg}</h4>
      )}
    </>
  );
};

export default Youtube;
