const SS = SpreadsheetApp.getActive();
const STATUS = SS.getRangeByName("Status");
const OWNER = SS.getRangeByName("Owner");
const YEAR = SS.getRangeByName("Year");

const applyFilter = (filterCriteria, columnHeading) => {
  const sheet = SS.getSheets().filter((s) => s.getSheetId() === 1757126654)[0];
  const jobListHeaders = SS.getRangeByName("JOBLIST_HEADERS");
  const jobListHeaderRow = jobListHeaders.getRow();
  const dataRange = sheet.getRange(
    jobListHeaderRow,
    1,
    sheet.getLastRow(),
    sheet.getLastColumn()
  );
  const filter = sheet.getFilter() || sheet.createFilter();
  const columnIndexToFilter = jobListHeaders
    .getValues()
    .flat()
    .indexOf(columnHeading);
  let hiddenValues = [];
  const values = dataRange.getValues();
  for (let i in values) {
    if (values[i][columnIndexToFilter] !== filterCriteria) {
      hiddenValues.push(values[i][columnIndexToFilter]);
    }
  }
  filter.setColumnFilterCriteria(
    columnIndexToFilter + 1,
    SpreadsheetApp.newFilterCriteria().setHiddenValues(hiddenValues).build()
  );
};

const removeFilter = (columnHeading) => {
  const sheet = SS.getSheets().filter((s) => s.getSheetId() === 1757126654)[0];
  const jobListHeaders = SS.getRangeByName("JOBLIST_HEADERS")
    .getValues()
    .flat();
  const filter = sheet.getFilter();
  const columnIndexToFilter = jobListHeaders.indexOf(columnHeading);
  filter.removeColumnFilterCriteria(columnIndexToFilter + 1);
};

// Clear Filter Functions
const clearStatusFilter = () => {
  removeFilter("Status");
  STATUS.clearContent();
};
const clearOwnerFilter = () => {
  removeFilter("Estimator / Owner");
  OWNER.clearContent();
};
const clearYearFilter = () => {
  removeFilter("Year");
  YEAR.clearContent();
};

// Status Slicer Button Functions
const statusSlicerCA = () => {
  applyFilter("CA", "Status");
  STATUS.setValue("CA");
};
const statusSlicerF = () => {
  applyFilter("F", "Status");
  STATUS.setValue("F");
};
const statusSlicerH = () => {
  applyFilter("H", "Status");
  STATUS.setValue("H");
};
const statusSlicerI = () => {
  applyFilter("I", "Status");
  STATUS.setValue("I");
};
const statusSlicerJ = () => {
  applyFilter("J", "Status");
  STATUS.setValue("J");
};
const statusSlicerQ = () => {
  applyFilter("Q", "Status");
  STATUS.setValue("Q");
};
const statusSlicerTI = () => {
  applyFilter("TI", "Status");
  STATUS.setValue("TI");
};
const statusSlicerX = () => {
  applyFilter("X", "Status");
  STATUS.setValue("X");
};
const statusSlicerZ = () => {
  applyFilter("Z", "Status");
  STATUS.setValue("Z");
};
const statusSlicerC = () => {
  applyFilter("C", "Status");
  STATUS.setValue("C");
};
const statusSlicerIP = () => {
  applyFilter("IP", "Status");
  STATUS.setValue("IP");
};
const statusSlicerS = () => {
  applyFilter("S", "Status");
  STATUS.setValue("S");
};

// Owner Slicer Button functions
const ownerSlicerCSI = () => {
  const value = "CSI";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerAndrew = () => {
  const value = "Andrew";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerChris = () => {
  const value = "Chris";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerJim = () => {
  const value = "Jim";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerJamey = () => {
  const value = "Jamey";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerChuck = () => {
  const value = "Chuck";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerDennis = () => {
  const value = "Dennis";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerJohn = () => {
  const value = "John";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerKeith = () => {
  const value = "Keith";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerLaura = () => {
  const value = "Laura";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerMatt = () => {
  const value = "Matt";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerMike = () => {
  const value = "Mike";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerNoel = () => {
  const value = "Noel";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerRick = () => {
  const value = "Rick";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerRJ = () => {
  const value = "RJ";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerSean = () => {
  const value = "Sean";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerZach = () => {
  const value = "Zach";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};
const ownerSlicerBlank = () => {
  const value = "";
  applyFilter(value, "Estimator / Owner");
  OWNER.setValue(value);
};

// Year Slicer Button functions
const yearSlicer2017 = () => {
  const value = "2017";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2018 = () => {
  const value = "2018";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2019 = () => {
  const value = "2019";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2020 = () => {
  const value = "2020";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2021 = () => {
  const value = "2021";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2022 = () => {
  const value = "2022";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2023 = () => {
  const value = "2023";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2024 = () => {
  const value = "2024";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
const yearSlicer2025 = () => {
  const value = "2025";
  applyFilter(value, "Year");
  YEAR.setValue(value);
};
