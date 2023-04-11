import React from "react";
import MAC from "../components/Graphs/MAC"
import Primary from "../components/Graphs/Primary";
import Secondary from "../components/Graphs/Secondary";

const Graphs = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <MAC />
      <Primary />
      <Secondary />
    </div>
  );
};

export default Graphs;
