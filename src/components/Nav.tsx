import React from "react";

import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="videoContainer">
      <Link to="/instagram" className="btn btn-secondary mt-3 ">
        Go to Instagram Download
      </Link>
      <Link to="/" className="btn btn-secondary mt-3 ml-4 ">
        Go to Youtube Download
      </Link>
    </div>
  );
};

export default Nav;
