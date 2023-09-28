import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: 14,
  fontWeight: '600'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BasicTable = ({ data }) => {

  const keys = Object.keys(data)
  const labels = Object.keys(data[keys[0]])

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 300 }} aria-label="table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Client / Company</StyledTableCell>
            <StyledTableCell align="right">
              {labels[0].charAt(0).toUpperCase() + labels[0].slice(1)}
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {keys.map((key) => (
            <StyledTableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">
                {data[key][labels[0]].toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) 
};

export default BasicTable;
