import React from "react";

const ResultCard = ({ word }) => {
  return (
    <div className="m-3 p-3 text-red-700 hover:text-gray-900 select-none">
      <p className="display text-xl">{word}</p>
    </div>
  );
};

export default ResultCard;
