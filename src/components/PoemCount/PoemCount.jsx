import React from "react";
import "./PoemCount.css"

function PoemCount({totalPoems}) {
  return (
    <div 
      className="poem-count">
      <span>{totalPoems} Poem{totalPoems !== 1 ? "s" : ""}</span>
      </div>
  );
}

export default PoemCount;