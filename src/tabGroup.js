import React from "react";
import { useState } from "react";
import styled from "styled-components";

function TabGroup(props) {
    const types = ["Income", "Expense"];
    const [active, setActive] = useState(types[0]);
    const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  width: 8rem;
  font-size: 1rem;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;


    function handleTransactionType(e,type){
        e.preventDefault();
        setActive(type);
        if(type === 'Income'){
            props.type[1](1);
        }
        else{
            props.type[1](-1);
        }
    }
    return (
      <>
        <div>
          {types.map((type) => (
            <Tab
              key={type}
              active={active === type}
              onClick={(e) => handleTransactionType(e,type)}
            >
              {type}
            </Tab>
          ))}
        </div>
        <p />
        <p> Your type selection: {active} </p>
      </>
    );
}

export default TabGroup;
