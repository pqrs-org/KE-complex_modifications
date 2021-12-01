import React, { createContext, useState } from "react";

export const JsonModalContext = createContext({
  open: false,
  title: "",
  fetching: false,
  jsonString: "",

  setOpen: (_open: React.SetStateAction<boolean>) => {},
  openModal: async (_title: string, _jsonString: string) => {},
});

export const JsonModalContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [fetching, setFetching] = useState(false);
  const [jsonString, setJsonString] = useState("");

  return (
    <JsonModalContext.Provider
      value={{
        open,
        title,
        fetching,
        jsonString,

        setOpen,

        openModal: async (title: string, jsonUrl: string) => {
          setTitle(title);
          setFetching(true);
          setJsonString("");

          try {
            const response = await fetch(jsonUrl);
            const json = await response.json();
            setJsonString(JSON.stringify(json, null, 2));
          } catch (err) {
            console.error(err);
            setJsonString(`ERROR: Failed to fetch: ${jsonUrl}`);
          }

          setFetching(false);
          setOpen(true);
        },
      }}
    >
      {props.children}
    </JsonModalContext.Provider>
  );
};
