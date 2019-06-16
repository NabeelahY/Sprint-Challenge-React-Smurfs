import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledForm = styled.div`
  form {
  width: 60%;
  display:block;
  padding: 1rem;
  margin: 0 auto;
   input {
     width: 100%;
     padding: 1.5rem 0;
     margin: 0.5rem 0;
     border: 1px #88ccff solid;
     border-radius: 0.2rem;
     font-size: 1.5rem;
     text-align: left;
     &:focus {
      border: 2px #0fa8eb solid;
     }
   }
   button {
     width: 100%
     border: none;
     border-radius: 0.2rem;
     padding: 1.5rem;
     background-color: #88ccff;
     color: #fff;
     text-transform: uppercase;
     font-weight: bold;
     font-size: 1rem;
     &:hover {
      background-color: #0fa8eb;
     }
   }
  }
`;

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: ""
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      const smurfEdit = this.props.smurfs.find(
        item => item.id === JSON.parse(id)
      );

      this.setState({
        name: smurfEdit.name,
        age: smurfEdit.age,
        height: smurfEdit.height
      });
    }
  }

  addSmurf = event => {
    const id = this.props.match.params.id;
    event.preventDefault();
    // add code to create the smurf using the api

    if (this.props.editing) {
      axios
        .put(`http://localhost:3333/smurfs/${id}`, this.state)
        .then(res => this.props.updateSmurfs(res.data))
        .catch(err => console.log(err))
        .finally(() => this.props.history.push("/"));
    } else {
      axios
        .post(`http://localhost:3333/smurfs`, this.state)
        .then(res => this.props.updateSmurfs(res.data))
        .catch(err => console.log(err))
        .finally(() => this.props.history.push("/"));
    }

    this.setState({
      name: "",
      age: "",
      height: ""
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <StyledForm>
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="Enter name..."
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Enter age..."
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Enter height..."
            value={this.state.height}
            name="height"
          />
          <button type="submit">
            {this.props.editing ? "Edit Smurf" : "Add to the village"}
          </button>
        </form>
      </StyledForm>
    );
  }
}

export default SmurfForm;
