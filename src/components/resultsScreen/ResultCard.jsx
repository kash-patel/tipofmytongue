import React from "react";

const ResultCard = ({ word }) => {
  return (
    <div className="white-background rounded m-3 p-3 shadow-md hover:-translate-y-1">
      <p className="font-bold text-xl">{word}</p>
    </div>
  );
};

export default ResultCard;
