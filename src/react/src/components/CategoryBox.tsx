import React, { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Chip,
  Divider,
  Grid,
  Link,
  styled,
} from "@mui/material";
import { ArrowForwardIosSharp as ArrowForwardIosSharpIcon } from "@mui/icons-material";
import IframeResizer from "iframe-resizer-react";
import { LocationHashContext } from "../contexts";
import { Category } from "../models";
import { baseUrl } from "../utils/fetch";
import { ImportButton } from "./ImportButton";

const color = "#28A745";

const CategoryBoxAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${color}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const CategoryBoxAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    alignItems: "center",
  },
}));

export const CategoryBox = ({ category }: { category: Category }) => {
  const locationHashContext = useContext(LocationHashContext);

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
          position: "sticky",
          top: 0,
          zIndex: 900,
        }}
      >
        {category.object.name}
      </Box>

      {category.files.map((f) => {
        if (locationHashContext.hash !== "") {
          if (
            // location.hash is not file id
            locationHashContext.hash !== f.id &&
            // location.hash is not category id
            locationHashContext.hash !== category.object.id
          ) {
            return undefined;
          }
        }

        return (
          <CategoryBoxAccordion
            id={f.id}
            TransitionProps={{ unmountOnExit: true }}
            key={f.id}
          >
            <CategoryBoxAccordionSummary>
              {f.object.json?.title}

              <Box sx={{ ml: "auto" }}>
                {f.object.json?.maintainers &&
                  f.object.json?.maintainers.map((m) => (
                    <Chip
                      label={
                        <>
                          Maintained by @
                          <Link
                            href={`https://github.com/${m}`}
                            target="_blank"
                            onClick={(event) => event.stopPropagation()}
                          >
                            {m}
                          </Link>
                        </>
                      }
                      variant="outlined"
                      sx={{ marginRight: 2 }}
                      key={`${f.id}-maintainers-${m}`}
                    />
                  ))}

                <ImportButton jsonFile={f} />
              </Box>
            </CategoryBoxAccordionSummary>
            <AccordionDetails>
              {f.object.json?.rules?.map((r, i) => (
                <Box key={`${f.id}-rules-${i}`}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ px: 2, my: 1 }}
                  >
                    <Box>{r.description}</Box>
                    <Box sx={{ ml: "auto" }}>
                      {r.available_since && (
                        <Chip
                          label={`Karabiner-Elements ${r.available_since} or later`}
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Grid>
                  <Divider />
                </Box>
              ))}
              {f.object.extra_description_path && (
                <Box
                  key={`${f.id}-rules-extra-description-${f.object.extra_description_path}`}
                >
                  <IframeResizer
                    style={{ border: 0, width: "100%" }}
                    heightCalculationMethod="lowestElement"
                    src={`${baseUrl()}/build/${
                      f.object.extra_description_path
                    }`}
                    title={f.object.extra_description_path}
                  />
                </Box>
              )}
            </AccordionDetails>
          </CategoryBoxAccordion>
        );
      })}
    </Box>
  );
};
