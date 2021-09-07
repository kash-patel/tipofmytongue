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
      className="white-background rounded p-3 mx-3 mt-10 shadow-md"
    >
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
        placeholder="type a word here..."
        onChange={(e) => setNewQuery({ ...newQuery, word: e.target.value })}
        disabled={relSelectorActive}
      />
      <div className="center-flex mt-5 mb-2">
        <button
          type="submit"
          className="p-3 mx-3 rounded-full blue-outline disabled:cursor-default disabled:text-gray-300 disabled:border-gray-300 disabled:pointer-events-none"
          disabled={relSelectorActive}
        >
          <FiCheck size="24" />
        </button>
        <button
          onClick={closeForm}
          className="p-3 mx-3 rounded-full blue-outline disabled:cursor-default disabled:text-gray-300 disabled:border-gray-300 disabled:pointer-events-none"
          disabled={relSelectorActive}
        >
          <FiX size="24" />
        </button>
      </div>
    </form>
  );
};

export default NewQueryForm;
