import React, { useState, useEffect } from "react";
import axios from "axios";

const SmurfCard = props => {
    console.log(props)
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
    <div>
      <h3>{`Hi! I am ${card.name}`}</h3>
      <div>{`I am ${card.age} years old and ${card.height} tall.`}</div>
    </div>
  );
};

export default SmurfCard;
