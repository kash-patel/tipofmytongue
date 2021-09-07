import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import globalContext from "../contexts/global/context";
import ActiveQueryList from "../components/homeScreen/ActiveQueryList";
import NewQueryForm from "../components/homeScreen/NewQueryForm";
import { FiPlus, FiSearch } from "react-icons/fi";

const Home = () => {
  const { queries } = useContext(globalContext);
  const [showNewQueryForm, setShowNewQueryForm] = useState(false);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    let qs = "";
    for (let i = 0; i < queries.length; i++)
      qs += queries[i].rel + "=" + queries[i].word + "&";
    qs += "max=30";
    setQueryString(qs);
  }, [queries]);

  return (
    <>
      <h1>I&rsquo;m looking for a word that</h1>
      {!showNewQueryForm ? (
        <>
          <ActiveQueryList queries={queries} />
          <div className="flex-center">
            <button
              className="p-3 mx-3 white-outline rounded-full"
              onClick={() => setShowNewQueryForm(true)}
            >
              <FiPlus size="24" />
            </button>
            {queries.length > 0 && (
              <Link to={`/search?${queryString}`}>
                <button className="p-3 mx-3 white-outline rounded-full">
                  <FiSearch size="24" />
                </button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <NewQueryForm closeForm={() => setShowNewQueryForm(false)} />
      )}
    </>
  );
};

export default Home;
