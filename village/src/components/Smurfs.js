import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Smurf from "./Smurf";

const StyleHome = styled.div`
  ul {
    a {
      text-decoration: none;
    }
    padding: 0;
    margin: 0 auto;
    width: 30%;
    div {
      width: 100%;
      padding: 1rem;
      margin: 0.5rem;
      background-color: #88ccff;

      &:hover {
        background-color: #0fa8eb;
      }
    }
  }
`;

class Smurfs extends Component {
  render() {
    return (
      <StyleHome>
        <h1>Smurf Village</h1>
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <Link to={`/smurfs/${smurf.id}`} key={smurf.id}>
                <Smurf name={smurf.name} id={smurf.id} />
              </Link>
            );
          })}
        </ul>
      </StyleHome>
    );
  }
}

Smurf.defaultProps = {
  smurfs: []
};

export default Smurfs;
