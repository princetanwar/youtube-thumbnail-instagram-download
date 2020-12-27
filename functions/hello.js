const axios = require("axios");

exports.handler = async function (event, context, callback) {
  // your server-side functionality

  if (event.httpMethod !== "POST") {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ msg: "not a vaild method" }),
    });
  }

  const { url } = JSON.parse(event.body);
  console.log(event);

  const { data } = await axios.post("https://y2mate.guru/api/convert", {
    url,
  });

  //   console.log(data);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ msg: "helo" }),
  //   };
};
