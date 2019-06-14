import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import styled from 'styled-components';
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import SmurfCard from "./components/SmurfCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState(() => ({ smurfs: res.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  updateSmurfs = smurfs => {
    this.setState({
      smurfs: smurfs
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="nav-bar">
            <NavLink to="/">
              <div className="home-button">Home</div>
            </NavLink>
            <NavLink to="/smurf-form">
              <div className="form-button">Form</div>
            </NavLink>
          </div>

          <Route
            path="/smurf-form"
            render={props => (
              <SmurfForm updateSmurfs={this.updateSmurfs} {...props} />
            )}
          />
          <Route
            exact
            path="/"
            render={props => <Smurfs smurfs={this.state.smurfs} {...props} />}
          />
          <Route
            exact
            path="/smurfs/:id"
            render={props => <SmurfCard smurfs={this.state.smurfs} {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
