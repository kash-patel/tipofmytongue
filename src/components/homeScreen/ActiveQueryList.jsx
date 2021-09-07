import React from "react";
import ActiveQueryCard from "./ActiveQueryCard";

const ActiveQueryList = ({ queries }) => {
  return (
    <div className="container my-10">
      {queries.map((query) => (
        <ActiveQueryCard
          key={`${query.rel}/${query.word}`}
          rel={query.rel}
          word={query.word}
        />
      ))}
    </div>
  );
};

export default ActiveQueryList;
