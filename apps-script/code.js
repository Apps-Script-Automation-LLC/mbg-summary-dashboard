const addProject = () => {
  const formulas = [
    [
      "",
      "",
      "=O4",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      '=IF(M4<>"","",IF(C1="",IF(M4="",RIGHT(YEAR(TODAY()),2)&"-"&TEXT(COUNTIF(JobList!AF:AF,RIGHT(YEAR(TODAY()),2)&"-*")+1,"0000"),"test"),RIGHT(YEAR(TODAY()),2)&"-"&TEXT(VALUE(RIGHT(C1,4)+COUNTIF(JobList!AF:AF,RIGHT(YEAR(TODAY()),2)&"-*")),"0000")))',
    ],
  ];
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheets().filter((s) => s.getSheetId() === 1757126654)[0];
  const projectRange = ss.getRangeByName("PROJECT_ENTRY").getValues();
  const projectEntryValues = ss.getRangeByName("PROJECT_ENTRY_VALUES");
  const jobListHeaders = ss
    .getRangeByName("JOBLIST_HEADERS")
    .getValues()
    .flat();
  const project = projectRange[0].reduce((acc, key, index) => {
    acc[key] = projectRange[1][index];
    return acc;
  }, {});
  let newJob = [];
  jobListHeaders.forEach((header) =>
    header in project
      ? newJob.push(project[header])
      : header === "Estimator"
      ? newJob.push(project["Estimator / Owner"])
      : newJob.push("")
  );
  sheet.appendRow(newJob);
  projectEntryValues.clearContent();
  projectEntryValues.setFormulas(formulas);
  ss.toast("Project Added ✅");
};
