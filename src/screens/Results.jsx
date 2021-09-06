import React from "react";

const Results = ({ location }) => {
  const query = location.search.slice(1, location.search.length);

  return <h3>Search query: {query}</h3>;
};

export default Results;
