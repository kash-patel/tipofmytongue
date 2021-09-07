import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
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
  }, [location.search]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <>
          <h1>Huh. Datamuse threw an error:</h1>
          <p>{error.message}</p>
        </>
      ) : results.length > 0 ? (
        <>
          <h1>Results</h1>
          <ResultsList results={results} />
        </>
      ) : (
        <h1>
          Hmm. Couldn&rsquo;t find any words that fit your criteria. Try
          broadening your search.
        </h1>
      )}
      <Link to="/">
        <button className="mt-10 white-outline rounded-full p-3">
          <FiArrowLeft size="24" />
        </button>
      </Link>
    </>
  );
};

export default Results;
