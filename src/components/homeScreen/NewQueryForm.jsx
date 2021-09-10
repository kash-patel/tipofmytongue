import React, { useContext, useState } from "react";
import globalContext from "../../contexts/global/context";
import { createQuery } from "../../actions/global/query";
import { queryToText } from "../../utils/homeScreen/query";
import { queryCodes } from "../../constants/homeScreen/query";
import PopupQueryRelSelector from "./PopupQueryRelSelector";
import { FiCheck, FiX, FiMenu } from "react-icons/fi";

const NewQueryForm = ({ closeForm }) => {
  const { dispatchQueryAction } = useContext(globalContext);
  const [relSelectorActive, setRelSelectorActive] = useState(false);
  const [newQuery, setNewQuery] = useState({
    rel: queryCodes[0],
    word: "",
  });

  const submitHandler = () => {
    dispatchQueryAction(createQuery(newQuery.rel, newQuery.word));
  };

  const selectRel = (e) => {
    setNewQuery({ ...newQuery, rel: e.target.id });
    setRelSelectorActive(false);
  };

  return (
    <form
      action="/"
      onSubmit={submitHandler}
      className="black-outline-rect p-3 mx-3 mt-10"
    >
      <div
        onClick={() => setRelSelectorActive(true)}
        className="relative p-2 maroon-underline hover:text-gray-900 hover:border-gray-900 flex items-center justify-between cursor-pointer"
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
        className="w-full mt-3 text-lg maroon-underline hover:text-gray-900 hover:border-gray-900 disabled:cursor-default disabled:dark-paper-background disabled:pointer-events-none focus:border-gray-900 focus:ring-0 focus:text-gray-900"
        placeholder="type a word here..."
        onChange={(e) => setNewQuery({ ...newQuery, word: e.target.value })}
        disabled={relSelectorActive}
      />
      <div className="center-flex mt-5 mb-2">
        <button
          type="submit"
          className="p-3 mx-3 rounded-full maroon-outline hover:border-gray-900 hover:text-gray-900 disabled:cursor-default disabled:text-gray-400 disabled:border-gray-400 disabled:pointer-events-none"
          disabled={relSelectorActive}
        >
          <FiCheck size="24" />
        </button>
        <button
          onClick={closeForm}
          className="p-3 mx-3 rounded-full maroon-outline hover:border-gray-900 hover:text-gray-900 disabled:cursor-default disabled:text-gray-400 disabled:border-gray-400 disabled:pointer-events-none"
          disabled={relSelectorActive}
        >
          <FiX size="24" />
        </button>
      </div>
    </form>
  );
};

export default NewQueryForm;
