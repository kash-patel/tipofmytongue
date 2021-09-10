import React, { useContext, useState } from "react";
import globalContext from "../../contexts/global/context";
import { updateQuery, deleteQuery } from "../../actions/global/query";
import { queryToText } from "../../utils/homeScreen/query";
import PopupQueryRelSelector from "./PopupQueryRelSelector";
import { FiTrash, FiCheck, FiX, FiMenu } from "react-icons/fi";

const ActiveQueryCard = ({ rel, word }) => {
  const { dispatchQueryAction } = useContext(globalContext);
  const [isExpanded, setIsExanded] = useState(false);
  const [relSelectorActive, setRelSelectorActive] = useState(false);
  const [newQuery, setNewQuery] = useState({ rel, word });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsExanded(false);
    dispatchQueryAction(
      updateQuery(`${rel}/${word}`, newQuery.rel, newQuery.word)
    );
  };

  const selectRel = (e) => {
    setNewQuery({ ...newQuery, rel: e.target.id });
    setRelSelectorActive(false);
  };

  return (
    <div className="m-3">
      {!isExpanded ? (
        <div
          className="black-underline grid grid-cols-8 cursor-pointer select-none hover:text-gray-500 hover:border-gray-500"
          onClick={() => setIsExanded(true)}
        >
          <div className="col-span-6 text-left p-3">
            <p>
              <em>{queryToText(rel)}</em>
            </p>
            <p className="text-2xl font-bold display">{word}</p>
          </div>
          <button
            onClick={() => dispatchQueryAction(deleteQuery(`${rel}/${word}`))}
            className="col-start-8 h-full center-flex hover:text-red-700"
          >
            <FiTrash size="24" />
          </button>
        </div>
      ) : (
        <form
          action="/"
          onSubmit={formSubmitHandler}
          className="p-3 black-outline-rect"
        >
          <div
            onClick={() => setRelSelectorActive(true)}
            className="relative p-2 maroon-underline flex items-center justify-between cursor-pointer hover:border-gray-900 hover:text-gray-900"
          >
            <span>{queryToText(newQuery.rel)}</span>
            <FiMenu size="20" />
            {relSelectorActive ? (
              <PopupQueryRelSelector
                selectRel={selectRel}
                closeSelector={() => setRelSelectorActive(false)}
              />
            ) : null}
          </div>
          <input
            type="text"
            required
            minLength="1"
            className="w-full mt-3 text-lg maroon-underline hover:text-gray-900 hover:border-gray-900 disabled:cursor-default disabled:border-gray-400 disabled:pointer-events-none focus:text-gray-900 focus:border-gray-900 focus:ring-0"
            value={newQuery.word}
            onChange={(e) => setNewQuery({ ...newQuery, word: e.target.value })}
            disabled={relSelectorActive}
          />
          <div className="center-flex">
            <button
              type="submit"
              className="rounded-full maroon-outline hover:border-gray-900 hover:text-gray-900 p-3 m-3 center-flex"
              disabled={relSelectorActive}
            >
              <FiCheck size="24" />
            </button>
            <button
              onClick={() => dispatchQueryAction(deleteQuery(`${rel}/${word}`))}
              className="rounded-full maroon-outline hover:border-gray-900 hover:text-gray-900 p-3 m-3 center-flex"
              disabled={relSelectorActive}
            >
              <FiTrash size="24" />
            </button>
            <button
              onClick={() => setIsExanded(false)}
              className="rounded-full maroon-outline hover:border-gray-900 hover:text-gray-900 p-3 m-3 center-flex"
              disabled={relSelectorActive}
            >
              <FiX size="24" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ActiveQueryCard;
