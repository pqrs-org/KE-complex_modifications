import React, { createContext, useState } from "react";

export const SnackbarContext = createContext({
  text: "",
  setText: (_: React.SetStateAction<string>) => {},
});

export const SnackbarContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [text, setText] = useState("");

  return (
    <SnackbarContext.Provider
      value={{
        text,
        setText,
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};
