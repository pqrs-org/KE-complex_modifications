import React, { useContext, useState } from "react";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { SearchQueryContext } from "../contexts";

export const SearchInput = () => {
  const searchQueryContext = useContext(SearchQueryContext);
  const [value, setValue] = useState(searchQueryContext.query);

  const submit = () => {
    if (searchQueryContext.query !== value) {
      searchQueryContext.setQuery(value);

      window.history.pushState(
        { q: value },
        "",
        "?q=" + encodeURIComponent(value)
      );
    }
  };

  return (
    <Box>
      <FormControl sx={{ width: "50ch" }} variant="outlined">
        <OutlinedInput
          value={value}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          onBlur={() => {
            submit();
          }}
        />
      </FormControl>
    </Box>
  );
};
