import React from "react";
import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  return React.createElement(CurrentUserContext.Provider, {
    value: {
      currentUser, setCurrentUser,
    },
    children,
  });
};



export const useCurrentUser = () => useContext(CurrentUserContext);