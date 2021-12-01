import React, { createContext } from "react";

export const LocationHashContext = createContext({
  hash: "",
});

export const LocationHashContextProvider = (props: {
  children: React.ReactNode;
}) => {
  return (
    <LocationHashContext.Provider
      value={{
        hash: window.location.hash.substr(1),
      }}
    >
      {props.children}
    </LocationHashContext.Provider>
  );
};
