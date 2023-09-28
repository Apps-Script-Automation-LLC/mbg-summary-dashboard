
import { CssBaseline, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import Logo from "./Logo";

import { GlobalContext } from "../context/GlobalState";

const NavBar = () => {
  const { 
    jobListData, 
    headers, 
    estimator, 
    company, 
    year, 
    updateEstimator,
    updateCompany,
    updateYear
   } = useContext(GlobalContext);
   
   
  const filteredData = jobListData.filter((row) => {
    return (
      (estimator === "" ||
        row[headers.indexOf("Estimator / Owner")] === estimator) &&
      (company === "" || row[headers.indexOf("Company")] === company) &&
      (year === "" || row[headers.indexOf("Year")] === year)
    );
  });


  const uniqueValuesFromColumns = (columnIndices) => {
    const uniqueValuesObject = {};
    for (const columnIndex of columnIndices) {
      const columnValues = jobListData.map((row) => row[columnIndex]);
      const uniqueValuesSet = new Set(columnValues);
      const uniqueValuesArray = Array.from(uniqueValuesSet);
      const heading = jobListData[0][columnIndex];
      uniqueValuesObject[heading] = uniqueValuesArray;
    }
    return uniqueValuesObject;
  }

  const dropDownValues = uniqueValuesFromColumns(
    [
      headers.indexOf("Estimator / Owner"),
      headers.indexOf("Company"),
      headers.indexOf("Year"),
    ]
  )
  
  
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Logo width={80} fill="#fff" />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
              }}
            >
              Summary Dashboard
            </Typography>

            <FormControl sx={{ marginRight: "3px", m: 1, minWidth: "120px" }}>
              <InputLabel id="estimator-select" sx={{ color: "primary.light" }}>
                Estimator
              </InputLabel>
              <Select
                labelId="estimator-select-label"
                id="estimator-select"
                value={estimator}
                onChange={(e) => updateEstimator(e.target.value)}
                autoWidth
                sx={{ color: "#fff" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {dropDownValues["Estimator / Owner"].map(
                  (estimatorOwner, index) =>
                    index !== 0 ? (
                      <MenuItem value={estimatorOwner}>
                        {estimatorOwner}
                      </MenuItem>
                    ) : (
                      ""
                    )
                )}
              </Select>
            </FormControl>

            <FormControl sx={{ marginRight: "6px", m: 1, minWidth: 200 }}>
              <InputLabel id="company-select" sx={{ color: "primary.light" }}>
                Company / Client
              </InputLabel>
              <Select
                labelId="company-select-label"
                id="company-select"
                value={company}
                label="Company"
                onChange={(e) => updateCompany(e.target.value)}
                autoWidth
                sx={{ color: "#fff" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {dropDownValues["Company"].map((companyClient, index) =>
                  index !== 0 ? (
                    <MenuItem value={companyClient}>{companyClient}</MenuItem>
                  ) : (
                    ""
                  )
                )}
              </Select>
            </FormControl>

            <FormControl sx={{ marginRight: "6px", m: 1, minWidth: 80 }}>
              <InputLabel id="year-select" sx={{ color: "primary.light" }}>
                Year
              </InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={year}
                label="Year"
                onChange={(e) => updateYear(e.target.value)}
                autoWidth
                sx={{ color: "#fff" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {dropDownValues["Year"].map((jobYear, index) =>
                  index !== 0 ? (
                    <MenuItem value={jobYear}>{jobYear}</MenuItem>
                  ) : (
                    ""
                  )
                )}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar





// import { Adb, ForkRight, Menu as MenuIcon, Villa } from "@mui/icons-material/";
// import {
//   AppBar,
//   Avatar,
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   Menu,
//   MenuItem,
//   Select,
//   Switch,
//   Toolbar,
//   Tooltip,
//   Typography
// } from "@mui/material";
// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "../context/GlobalState";

// import Logo from "./Logo";


// const NavBar = () => {
//   const { isDarkTheme, updateTheme } = useContext(GlobalContext)
  
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const navigate = useNavigate()


//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
//   const switchTheme = () => {
//     updateTheme(isDarkTheme)
//   }

//   return (
//     <>
//       <CssBaseline />
//       <AppBar position="static">
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <Logo width={80} fill="#fff" />
//             {/* <Villa sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            // <Typography
            //   variant="h6"
            //   noWrap
            //   sx={{
            //     mr: 2,
            //     display: { xs: "none", md: "flex" },
            //     fontWeight: 700,
            //     color: "inherit",
            //     textDecoration: "none",
            //   }}
            // >
            //   Dashboard
            // </Typography>

//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//               <Villa sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//               <Typography
//                 variant="h5"
//                 noWrap
//                 component="a"
//                 href=""
//                 sx={{
//                   mr: 2,
//                   display: { xs: "flex", md: "none" },
//                   flexGrow: 1,
//                   fontWeight: 700,
//                   color: "inherit",
//                   textDecoration: "none",
//                 }}
//               >
//                 McBrick Dashboard
//               </Typography>
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </>
//   );
// }
// export default NavBar;
