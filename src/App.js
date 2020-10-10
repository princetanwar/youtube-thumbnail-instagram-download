import React from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import Nav from "./components/Nav";
import Youtube from "./components/Youtube";
import Instagram from "./components/Instagram";

function App() {
  return (
    <Router>
      <Container>
        <Nav />
        <Switch>
          <Route path="/" exact component={Youtube} />
          <Route path="/instagram" exact component={Instagram} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
