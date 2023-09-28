import { ThemeProvider, createTheme } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';


const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#EDEDED",
      main: "#02533A",
      contrastText: "#FFF",
      dark: "#666",
      mainGraph: "rgba(2, 83, 58, 0.5)",
      seconGraph: "rgba(0, 250, 171, 0.5)",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#EDEDED",
      main: "#4472c4",
      contrastText: "#FFF",
    },
  },
});

const Theme = ({children}) => {
    const { isDarkTheme } = useContext(GlobalContext);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme