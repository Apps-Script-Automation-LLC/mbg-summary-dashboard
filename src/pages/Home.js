import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import NoData from "../components/NoData";
import BasicTable from "../components/Table";
import VertBarChart from "../components/VertBarChart";
import { GlobalContext } from "../context/GlobalState";


const Home = () => {
  const { jobListData, loading, error, fetchData, headers, estimator, company, year } = useContext(GlobalContext);

  const isEmptyObject = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    fetchData()   
  }, [])

  const filteredData = jobListData.filter((row) => {
    return (
      (estimator === "" || row[headers.indexOf('Estimator / Owner')] === estimator) &&
      (company === "" || row[headers.indexOf('Company')] === company) &&
      (year === "" || row[headers.indexOf('Year')] === year)
    );
  })
  
  const getColumnSum = (arr, columnIndex) =>
    arr.reduce(
      (sum, row) =>
        row[columnIndex].toString() !== "" && row[columnIndex].includes("$")
          ? sum + parseInt(row[columnIndex].replace(/[^0-9.-]+/g, ""))
          : sum,
      0
    );

  const getColumnAverage = (arr, columnIndex) => {
    const columnValues = arr
      .map((row) => row[columnIndex])
      .filter((value) => value !== '' && value.includes("$"));
    const sum = columnValues.reduce(
      (acc, value) => acc + parseFloat(value.replace(/[^0-9.-]+/g, "")),
      0
    );
    const count = columnValues.length;

    if (count === 0) {
      return 0;
    }
    return sum / count;
  };

  const rowCountIfNotBlank = (arr, columnIndex) =>
    arr.reduce(
      (count, row) => (row[columnIndex] !== "" ? count + 1 : count),
      0
    );

  const rowCountAwarded = (arr, columnIndex) =>
    arr.reduce(
      (count, row) => (row[columnIndex] === "J" ? count + 1 : count),
      0
    );

  const sumTotalAwardedAmount = (arr, countColumnIndex, sumColumnIndex) =>
    arr.reduce(
      (sum, row) =>
        row[countColumnIndex] === "J" && row[sumColumnIndex].includes("$")
          ? sum + parseFloat(row[sumColumnIndex].replace(/[^0-9.-]+/g, ""))
          : sum,
      0
    );

  const getJobScoreAverage = (arr, columnIndex) => {
    const columnValues = arr
      .slice(1)
      .map((row) => row[columnIndex])
      .filter((value) => value !== "");

    const sum = columnValues.reduce((acc, value) => acc + parseInt(value), 0);
    const count = columnValues.length;

    if (count === 0) {
      return 0;
    }
    
    return sum / count;
  }


  const totalJobs = rowCountIfNotBlank(filteredData, headers.indexOf('Status'))

  const proposalAmount = getColumnSum(
    filteredData,
    headers.indexOf("Proposal Amount")
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const totalJobsAwarded = rowCountAwarded(filteredData, headers.indexOf("Status"))

  const invoicedAmount = getColumnSum(
    filteredData,
    headers.indexOf("Invoiced Amount")
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  
  const averageJobScore = getJobScoreAverage(
    filteredData,
    headers.indexOf("Score")
  ).toFixed(1)

  const averageProposalAmount = getColumnAverage(
    filteredData,
    headers.indexOf("Proposal Amount")
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
  })

  const totalAwardedAmount = sumTotalAwardedAmount(
    filteredData,
    headers.indexOf("Status"),
    headers.indexOf("Proposal Amount")
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const averageInvoiceAmount = getColumnAverage(
    filteredData,
    headers.indexOf("Invoiced Amount")
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const sortByAndFetchTopX = (obj, x) => {
    const entries = Object.entries(obj)
    entries.sort((a, b) => {
      if (b[1].invoiced !== a[1].invoiced) {
        return b[1].invoiced - a[1].invoiced
      } else {
        return b[1].proposal - a[1].proposal
      }
    })
    const res = Object.fromEntries(entries.slice(0, x))
    return res
  }


  const sumAndGroupBy = (groupColumnIndex, sumColumnIndex, label) => {
    const obj = {};
    filteredData.forEach((row, index) => {
      if (index !== 0 && row[groupColumnIndex].toString() !== "") {
        const group = row[groupColumnIndex];
        const sum = row[sumColumnIndex].includes("$")
          ? parseFloat(row[sumColumnIndex].replace(/[^0-9.-]+/g, ""))
          : Number(row[sumColumnIndex]);

        if (!obj[group]) {
          obj[group] = { [label]: 0 };
        }
        obj[group][label] = obj[group][label] + sum;
      }
    });
    return obj;
  };

  const sumInvoicedAndProposals = (groupColumnIndex, sumColumnIndex1, sumColumnIndex2) => {
    const obj = {}
    filteredData.forEach((row, index) => {
      if(index !== 0 && row[groupColumnIndex].toString() !== "") {
        const group = row[groupColumnIndex];
        const sum1 = row[sumColumnIndex1].includes("$")
          ? parseFloat(row[sumColumnIndex1].replace(/[^0-9.-]+/g, ""))
          : Number(row[sumColumnIndex1]);
        const sum2 = row[sumColumnIndex2].includes("$")
          ? parseFloat(row[sumColumnIndex2].replace(/[^0-9.-]+/g, ""))
          : Number(row[sumColumnIndex2]);

        if (!obj[group]) {
          obj[group] = {
            invoiced: 0,
            proposal: 0,
          };
        }
        obj[group].invoiced = obj[group].invoiced + sum1;
        obj[group].proposal = obj[group].proposal + sum2;
      }
    })
    return obj
  }

  const invoicedAndProposalsOverTime = () => {
    const invoiced = getColumnSum(
      filteredData,
      headers.indexOf("Invoiced Amount")
    );
    const poTotal = getColumnSum(
      filteredData,
      headers.indexOf("Invoiced - PO")
    )
    const obj = {
      "$ Amount": { Invoiced: invoiced, PO_Total: poTotal },
    };
    return obj
  }

  const jobScoreByOwner = sumAndGroupBy(headers.indexOf('Estimator / Owner'), headers.indexOf('Score'), 'Score')
  
  const projectLengthByProjectManager = sumAndGroupBy(
    headers.indexOf("Project Manager"),
    headers.indexOf("Job End - Job Start"),
    "Job End - Job Start"
  );

  const submittedRfpDaysByEstimator = sumAndGroupBy(
    headers.indexOf("Estimator"),
    headers.indexOf("Submitted - RFP (Days)"),
    "Submitted - RFP (Days)"
  );

  const proposedAndInvoicedByClient = sortByAndFetchTopX(
    sumInvoicedAndProposals(
      headers.indexOf("Company"),
      headers.indexOf("Invoiced Amount"),
      headers.indexOf("Proposal Amount")
    ), 7
  )
    
  const proposedAndInvoicedByClientChild = sortByAndFetchTopX(
    sumInvoicedAndProposals(
      headers.indexOf('Client Child'),
      headers.indexOf('Invoiced Amount'), 
      headers.indexOf('Proposal Amount')
    ), 7
  )
  const proposedAndInvoicedByType = sumInvoicedAndProposals(
    headers.indexOf("Project Type"),
    headers.indexOf("Invoiced Amount"),
    headers.indexOf("Proposal Amount")
  );
  const proposedAndInvoicedByEstimator = sumInvoicedAndProposals(
    headers.indexOf('Estimator / Owner'),
    headers.indexOf('Invoiced Amount'), 
    headers.indexOf('Proposal Amount')
  )


  const top15Proposals = sortByAndFetchTopX(
    sumAndGroupBy(
      headers.indexOf("Company"),
      headers.indexOf("Proposal Amount"),
      "proposal"
    ),15
  )

  const top15Invoiced = sortByAndFetchTopX(
    sumAndGroupBy(
      headers.indexOf("Company"),
      headers.indexOf("Invoiced Amount"),
      "invoiced"
    ),15
  )




  return loading ? (
    <Loading />
  ) : (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Box sx={{ marginTop: "60px" }}>
          <Grid container spacing={4}>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Number of Jobs
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Proposal Amount
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Total Jobs Awarded
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Invoiced Amount
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {totalJobs}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {proposalAmount}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {totalJobsAwarded}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {invoicedAmount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "60px" }}>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Average Job Score
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Average Proposal Amount
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Total Award Amount
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Average Invoiced Amount
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {averageJobScore}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {averageProposalAmount}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {totalAwardedAmount}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "600" }}
                  color="primary.dark"
                >
                  {averageInvoiceAmount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "60px" }}>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px" }}
              >
                {isEmptyObject(jobScoreByOwner) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={jobScoreByOwner}
                    title="Job Score By Owner"
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px", margin: "6px" }}
              >
                {isEmptyObject(projectLengthByProjectManager) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={projectLengthByProjectManager}
                    title="Project Length By Project Manager"
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px", margin: "6px" }}
              >
                {isEmptyObject(invoicedAndProposalsOverTime()) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={invoicedAndProposalsOverTime()}
                    title="Invoiced vs PO Total"
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px", margin: "6px" }}
              >
                {isEmptyObject(submittedRfpDaysByEstimator) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={submittedRfpDaysByEstimator}
                    title="Submitted RFP Days By Estimator"
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px", margin: "6px" }}
              >
                {isEmptyObject(proposedAndInvoicedByClient) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={proposedAndInvoicedByClient}
                    title="Proposed & Invoiced By Client"
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px", margin: "6px" }}
              >
                {isEmptyObject(proposedAndInvoicedByClientChild) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={proposedAndInvoicedByClientChild}
                    title="Proposed & Invoiced By Client Child"
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px", margin: "6px" }}
              >
                {isEmptyObject(proposedAndInvoicedByType) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={proposedAndInvoicedByType}
                    title="Proposed & Invoiced By Type"
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "200px", margin: "6px" }}
              >
                {isEmptyObject(proposedAndInvoicedByEstimator) ? (
                  <NoData />
                ) : (
                  <VertBarChart
                    chartData={proposedAndInvoicedByEstimator}
                    title="Proposed & Invoiced By Estimator"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "60px" }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                  color="primary"
                >
                  Top 15 Clients
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ margin: "10px", padding: "20px" }}
              >
                {isEmptyObject(top15Invoiced) ? (
                  <NoData />
                ) : (
                  <BasicTable data={top15Invoiced} />
                )}
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ margin: "10px", padding: "20px" }}
              >
                {isEmptyObject(top15Proposals) ? (
                  <NoData />
                ) : (
                  <BasicTable data={top15Proposals} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Home