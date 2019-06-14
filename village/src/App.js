import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import styled from 'styled-components';
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import SmurfCard from "./components/SmurfCard";

const StyledVillage = styled.div `
  text-align: center;
  margin: 0 auto;
  nav {
    padding: 0.5rem;
    height: 3rem;
    background-color: #88CCFF;
    border-bottom: 3px #fbf404 solid;
    display: flex;
    justify-content: flex-end;
    align-items:center;

    a {
      padding: 0 1rem;
      text-decoration: none;
      color:#fff;
    }
  }
`

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
        <StyledVillage>
          <nav>
            <NavLink to="/">
              <div>Home</div>
            </NavLink>
            <NavLink to="/smurf-form">
              <div>Form</div>
            </NavLink>
          </nav>

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
        </StyledVillage>
      </Router>
    );
  }
}

export default App;
