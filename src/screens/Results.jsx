import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultsList from "../components/resultsScreen/ResultsList";

const Results = ({ location }) => {
  const [results, updateResults] = useState([]);
  const [error, updateError] = useState(null);
  const [loading, updateLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      updateLoading(true);
      try {
        const response = await axios.get(
          `https://api.datamuse.com/words${location.search}`
        );
        // const json = response.json();
        const data = await response.data;
        updateResults(data);
      } catch (error) {
        updateError(error);
      }
      updateLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <>
          <h1>Huh. Datamuse threw an error:</h1>
          <p>{error.message}</p>
        </>
      ) : (
        <>
          <h1>Results</h1>
          <ResultsList results={results} />
        </>
      )}
    </>
  );
};

export default Results;
