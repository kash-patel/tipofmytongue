import React, { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { queryCodes } from "../../constants/homeScreen/query";
import { queryToText } from "../../utils/homeScreen/query";

const PopupQueryRelSelector = ({ selectRel, closeSelector }) => {
  const relSelectorRef = useRef();

  useClickOutside(relSelectorRef, closeSelector);

  return (
    <div
      ref={relSelectorRef}
      className="absolute max-h-96 w-full overflow-y-auto mx-auto left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 white-background rounded shadow-md"
    >
      {queryCodes.map((q, key) => (
        <p
          key={key}
          id={q}
          className="p-3 border-b cursor-pointer hover:bg-gray-100 transition-none select-none"
          onClick={selectRel}
        >
          {queryToText(q)}
        </p>
      ))}
    </div>
  );
};
export default PopupQueryRelSelector;
