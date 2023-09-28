
const doGet = () => {
    return HtmlService.createTemplateFromFile("index.html")
      .evaluate()
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
}


const fetchJobList = () => {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("JobList");
  const headerRow = ss.getRangeByName('JOBLIST_HEADERS').getRow()
  const jobListData = sheet
    .getRange(headerRow, 2, sheet.getLastRow() - headerRow, sheet.getLastColumn())
    .getDisplayValues()
  return jobListData;
};

// const authenticateUserLogin = (user, pass) => {
//   const ss = SpreadsheetApp.getActive();
//   const sheet = ss.getSheets().filter((s) => s.getSheetId() === 0)[0];
//   const dataRange = sheet.getDataRange();
//   const [headers, ...dataValues] = dataRange.getValues();

//   let incorrectPassword = false
//   let userNotFound = false

//   for(const row of dataValues) {
//     const emailCol = row[headers.indexOf("Email")];
//     const passCol = row[headers.indexOf("Password")];
//     if (emailCol === user) {
//       if (passCol === pass) {
//         const userData = row.reduce((obj, v, i) => ((obj[headers[i]] = v), obj), {});
//         return userData
//       } else {
//         incorrectPassword = true
//       }
//     } else {
//       userNotFound = true
//     }
//   }
//   if(incorrectPassword) throw new Error("Incorrect password")
//   if(userNotFound) throw new Error("User not found");
// };