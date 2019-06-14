import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledCard = styled.div`
  margin: 1rem auto;
  padding: 0.5rem;
  border: 1px #88CCFF solid;
  width: 30%;
  line-height: 2rem;
  &:hover {
    background-color: #88CCFF;
    color: #fff;
    border: 1px #fbf404 solid;
  }
`;

const SmurfCard = props => {
  console.log(props);
  const [card, updateCard] = useState(props.smurfs);

  useEffect(() => {
    const smurfId = props.match.params.id;

    const getSmurf = id => {
      axios
        .get(`http://localhost:3333/smurfs/${id}`)
        .then(res => updateCard(res.data))
        .catch(err => console.log(err));
    };
    getSmurf(smurfId);
  }, [props.match.params.id]);

  return (
    <StyledCard>
      <h3>{`Hi! I am ${card.name}`}</h3>
      <div>{`I am ${card.age} years old and ${card.height} tall.`}</div>
    </StyledCard>
  );
};

export default SmurfCard;
