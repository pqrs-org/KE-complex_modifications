import React, { createContext, useState } from "react";

export const SearchQueryContext = createContext({
  query: "",
  setQuery: (_: React.SetStateAction<string>) => {},
});

export const SearchQueryContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState(
    new URLSearchParams(window.location.search).get("q") ?? ""
  );
  return (
    <SearchQueryContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {props.children}
    </SearchQueryContext.Provider>
  );
};
