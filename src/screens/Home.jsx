import React, { useContext, useState } from "react";
import globalContext from "../contexts/global/context";
import ActiveQueryList from "../components/homeScreen/ActiveQueryList";
import NewQueryForm from "../components/homeScreen/NewQueryForm";
import { FiPlus, FiSearch } from "react-icons/fi";

const Home = () => {
  const { queries } = useContext(globalContext);
  const [showNewQueryForm, setShowNewQueryForm] = useState(false);

  const newQuery = () => {
    setShowNewQueryForm(true);
  };
  return (
    <>
      <h1>I&rsquo;m looking for a word that</h1>
      {!showNewQueryForm ? (
        <>
          <ActiveQueryList queries={queries} />
          <div className="flex-center">
            <button
              className="p-3 mx-3 white-outline rounded-full"
              onClick={newQuery}
            >
              <FiPlus size="24" />
            </button>
            {queries.length > 0 && (
              <button
                className="p-3 mx-3 white-outline rounded-full"
                // onClick={() => dispatchQueryAction(createQuery("ml", "salty"))}
              >
                <FiSearch size="24" />
              </button>
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
