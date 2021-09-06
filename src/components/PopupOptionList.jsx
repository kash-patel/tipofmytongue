import React, { useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";

const PopupOptionList = ({ initial, children }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptionList = () => {
    setShowOptions(!showOptions);
  };
  return (
    <>
      <div
        className="relative flex items-center justify-between select-none w-full cursor-pointer px-3 py-2 text-left rounded border border-gray-500"
        onClick={toggleOptionList}
      >
        <span className="text-base">{initial}</span>
        <FiArrowUpCircle size="20" />
        {showOptions ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-96 white-background shadow-md overflow-y-auto rounded">
            {children}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PopupOptionList;
