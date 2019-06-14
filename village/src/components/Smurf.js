import React from "react";
import styled from "styled-components";

const StyledSmurf = styled.div `
    color: #fff;
`

const Smurf = props => {
  return (
    <StyledSmurf className="Smurf">
      <h3>{props.name}</h3>
    </StyledSmurf>
  );
};

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
