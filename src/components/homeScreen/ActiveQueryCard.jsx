import React, { useContext, useState } from "react";
import globalContext from "../../contexts/global/context";
import { updateQuery, deleteQuery } from "../../actions/global/query";
import { queryToText } from "../../utils/homeScreen/query";
import PopupQueryRelSelector from "./PopupQueryRelSelector";
import { FiTrash, FiCheck, FiChevronUp, FiMenu } from "react-icons/fi";

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
    <div className="white-background rounded m-3 shadow hover:-translate-y-1">
      {!isExpanded ? (
        <div
          className="grid grid-cols-8 cursor-pointer select-none"
          onClick={() => setIsExanded(true)}
        >
          <div className="col-span-6 text-left p-3">
            <p>{queryToText(rel)}</p>
            <p className="text-xl font-bold">{word}</p>
          </div>
          <button
            onClick={() => dispatchQueryAction(deleteQuery(`${rel}/${word}`))}
            className="col-start-8 h-full center-flex hover:text-red-700"
          >
            <FiTrash size="24" />
          </button>
        </div>
      ) : (
        <form action="/" onSubmit={formSubmitHandler} className="p-3">
          <div
            onClick={() => setRelSelectorActive(true)}
            className="relative rounded p-3 shadow-md border flex items-center justify-between cursor-pointer hover:shadow-lg"
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
            className="w-full mt-3 rounded disabled:cursor-default disabled:bg-gray-100 disabled:pointer-events-none"
            value={newQuery.word}
            onChange={(e) => setNewQuery({ ...newQuery, word: e.target.value })}
            disabled={relSelectorActive}
          />
          <div className="center-flex">
            <button
              type="submit"
              className="blue-outline rounded-full p-3 m-3 center-flex"
              disabled={relSelectorActive}
            >
              <FiCheck size="24" />
            </button>
            <button
              onClick={() => dispatchQueryAction(deleteQuery(`${rel}/${word}`))}
              className="blue-outline rounded-full p-3 m-3 center-flex"
              disabled={relSelectorActive}
            >
              <FiTrash size="24" />
            </button>
            <button
              onClick={() => setIsExanded(false)}
              className="blue-outline rounded-full p-3 m-3 center-flex"
              disabled={relSelectorActive}
            >
              <FiChevronUp size="24" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ActiveQueryCard;
