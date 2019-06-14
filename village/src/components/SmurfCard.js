import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledCard = styled.div`
  margin: 1rem auto;
  padding: 0.5rem;
  border: 1px #88ccff solid;
  width: 30%;
  line-height: 2rem;
  &:hover {
    background-color: #88ccff;
    color: #fff;
    border: 1px #fbf404 solid;
  }

  button {
    width: 20%;
    margin: 0 0.5rem;
    border: none;
    border-radius: 0.2rem;
    padding: 0.5rem;
    background-color: #0fa8eb;
    color: #fff;
  }
`;

const SmurfCard = props => {
  console.log(props);
  const [card, updateCard] = useState(props.smurfs);

  const id = props.match.params.id;
  
  useEffect(() => {
    const getSmurf = id => {
      axios
        .get(`http://localhost:3333/smurfs/${id}`)
        .then(res => updateCard(res.data))
        .catch(err => console.log(err));
    };
    getSmurf(id);
  }, [props.match.params.id]);

  const deleteSmurf = (id) => {
    console.log(props.history);
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => props.updateSmurfs(res.data))
      .catch(error => {
        console.error(error);
      })
    .finally(() => props.history.push("/"));
  };

  return (
    <StyledCard>
      <h3>{`Hi! I am ${card.name}`}</h3>
      <div>{`I am ${card.age} years old and ${card.height} tall.`}</div>
      <button onClick ={() => deleteSmurf(id)}>Delete</button>
      <button onClick ={() => {
        props.history.push(`/update-smurf/${card.id}`);
      }}>Update</button>
    </StyledCard>
  );
};

export default SmurfCard;
