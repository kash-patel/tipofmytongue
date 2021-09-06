import React, { useState } from "react";
import PopupOptionList from "../components/PopupOptionList";
import { queryToText } from "../utils/query";
import { queryCodes } from "../constants/query";
import {
  FiPlus,
  FiCheck,
  FiX,
  FiChevronDown,
  FiSearch,
  FiTrash,
} from "react-icons/fi";

const Home = ({ createQuery, updateQuery, deleteQuery, queries }) => {
  const [showNewQueryForm, setShowNewQueryForm] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [activeRel, setActiveRel] = useState(queryCodes[0]);

  const submitForm = (e) => {
    e.preventDefault();

    if (query.word.length > 0) {
      createQuery(query.rel, query.word);
      setShowNewQueryForm(false);
    } else {
      showAlert("Please type the word you want to compare with.");
    }
  };

  const showCreateQueryForm = () => {
    setShowNewQueryForm(true);
  };

  const selectRel = (rel) => {
    setActiveRel(rel);
    query.rel = rel;
  };

  const cancelCreateQuery = () => {
    setShowNewQueryForm(false);
    setAlertVisible(false);
    query.rel = "ml";
    query.word = "";
  };

  const removeQuery = (e) => {
    deleteQuery(e.currentTarget.parentNode.id);
  };

  const showAlert = (message) => {
    setMessageContent(message);
    setAlertVisible(true);
  };

  const queryDivs = queries.map((q) => (
    <div
      key={q.rel + "/" + q.word}
      id={q.rel + "/" + q.word}
      className="grid grid-cols-8 gap-0 items-center p-3 white-background m-3 rounded shadow-md text-left"
    >
      <div className="col-span-6">
        <p>{queryToText(q.rel)}</p>
        <p className="font-bold text-xl inline pt-3">{q.word}</p>
      </div>
      <button
        type="button"
        onClick={removeQuery}
        className="col-start-8 center-flex h-full"
      >
        <FiTrash size="24" />
      </button>
    </div>
  ));

  return (
    <>
      {alertVisible && (
        <p className="white-background  p-3 rounded m-3 absolute top-0 shadow-md">
          {messageContent}
        </p>
      )}

      {showNewQueryForm ? (
        <>
          <h1 className="text-center">I&rsquo;m looking for a word that</h1>
          <form
            id="newQueryForm"
            className="white-background max-w-sm p-5 m-5 rounded shadow-md"
            onSubmit={submitForm}
          >
            <PopupOptionList initial={queryToText(activeRel)}>
              {queryCodes.map((q, index) => (
                <span
                  key={`${index}`}
                  id={q}
                  className="block p-3 hover:blue-background focus:blue-background active:blue-background border-t border-b border-gray-200"
                  onClick={() => selectRel(q)}
                >
                  {queryToText(q)}
                </span>
              ))}
            </PopupOptionList>
            <FiChevronDown size="24" className="mx-auto my-3" />
            <input
              type="text"
              className="text-left rounded w-full"
              min="1"
              onChange={(e) => {
                alertVisible && setAlertVisible(false);
                query.word = e.target.value;
              }}
            />
            <div className="px-10 mt-10 w-full flex justify-around items-center">
              <button
                type="submit"
                className="inline-block blue-background p-3 shadow-md rounded-full"
              >
                <FiCheck size="24" />
              </button>

              <button
                type="button"
                className="inline-block blue-background p-3 shadow-md rounded-full"
                onClick={cancelCreateQuery}
              >
                <FiX size="24" />
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-center mb-5">
            I&rsquo;m looking for a word that
          </h1>
          {queryDivs}
          <div className="flex items-center justify-center px-20 w-full">
            <button
              className="rounded-full p-3 mt-5 mx-auto center-flex white-outline"
              onClick={showCreateQueryForm}
            >
              <FiPlus size="24" />
            </button>
            {queries.length > 0 ? (
              <button
                className="rounded-full p-3 mt-5 mx-auto center-flex white-outline"
                // onClick={showCreateQueryForm}
              >
                <FiSearch size="24" />
              </button>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

const query = {
  rel: "ml",
  word: "",
};
