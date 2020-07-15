import React from 'react';
import './css/main.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AudioPage from "./components/AudioPage";
import {createMuiTheme} from "@material-ui/core";
import PhotosPage from './components/PhotosPage';
import MarsPage from "./components/MarsPage";


export default function App() {

  return (
    <Router>
    <Switch>

      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route path="/photos">
        <PhotosPage />
      </Route>

      <Route path="/audio">
        <AudioPage />
      </Route>

      <Route path="/mars_rover">
        <MarsPage />
      </Route>

    </Switch>
    </Router>
  );
}
