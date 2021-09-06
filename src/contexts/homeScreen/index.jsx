import homeSceenContext from "./contexts";

import React from "react";

const state = {};

const HomeScreenContextProvider = ({ children }) => {
  return (
    <homeSceenContext.Provider value={state}>
      {children}
    </homeSceenContext.Provider>
  );
};

export default HomeScreenContextProvider;
