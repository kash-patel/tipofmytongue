import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import ResultsList from "../components/resultsScreen/ResultsList";

const Results = ({ location, history }) => {
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
    <div className="container p-3">
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
      <button
        className="mt-10 maroon-outline hover:border-gray-900 hover:text-gray-900 rounded-full p-3"
        onClick={history.goBack}
      >
        <FiArrowLeft size="24" />
      </button>
    </div>
  );
};

export default Results;
