import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box>
        <CircularProgress sx={{ padding: "40px;" }} />
        <Typography
          variant="p"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "0.7rem",
          }}
        >Please wait...
        </Typography>
      </Box>
    </Box>
  );
}

export default Loading