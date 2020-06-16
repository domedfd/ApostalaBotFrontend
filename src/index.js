import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { Route } from "react-router-dom";
import { StateInspector } from "reinspect"



ReactDOM.render(
  <React.StrictMode>
   <StateInspector name="App">
    <Routes />
    </StateInspector>
  </React.StrictMode>,
  document.getElementById("root")
);
