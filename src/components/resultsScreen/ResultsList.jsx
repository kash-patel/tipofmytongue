import React from "react";
import ResultCard from "./ResultCard";

const ResultsList = ({ results }) => {
  return (
    <div className="container my-10 black-outline-rect">
      {results.map((result) => {
        return <ResultCard key={result.word} word={result.word} />;
      })}
    </div>
  );
};

export default ResultsList;
