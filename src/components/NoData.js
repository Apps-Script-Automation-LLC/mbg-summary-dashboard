import { Box, Typography } from "@mui/material";
import React from "react";

const NoData = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "3rem",
          }}
        >
          No Data Found...
        </Typography>
      </Box>
    </Box>
  );
};

export default NoData;
