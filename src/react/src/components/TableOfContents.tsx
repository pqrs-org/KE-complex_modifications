import React from "react";
import { Box, Chip, Divider, Grid, Link } from "@mui/material";
import { Category } from "../models";

export const TableOfContents = ({ categories }: { categories: Category[] }) => {
  const color = "black";

  return (
    <Box
      sx={{
        border: `1px solid ${color}`,
      }}
    >
      <Box
        sx={{
          p: 2,
          color: "white",
          backgroundColor: color,
        }}
      >
        Table of Contents
      </Box>

      {categories.map((c) => {
        return (
          <Box key={c.object.id}>
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ px: 2, my: 1 }}
            >
              <Link href={`#${c.object.id}`}>{c.object.name}</Link>
              <Box sx={{ ml: "auto" }}>
                <Chip label={c.files.length} />
              </Box>
            </Grid>

            <Divider />
          </Box>
        );
      })}
    </Box>
  );
};
