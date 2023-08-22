const XLSX = require("xlsx");
const getProposals = require("../db/data");
const path = require("path");

class XlsxService {
  async createWorkSheet() {
    const jsonData = await getProposals();
    const workSheet = XLSX.utils.json_to_sheet(jsonData);
    return workSheet;
  }

  formatSheet(workSheet) {
    workSheet["F2"].z = '"$"#,##0.00_);\\("$"#,##0.00\\)';
    workSheet["F3"].z = "#,##0";
    workSheet["F4"].z = "0.00%";
  }

  createWorkBook() {
    const workBook = XLSX.utils.book_new();
    return workBook;
  }

  bookAppendSheet(workBook, workSheet, sheetName) {
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
  }

  writeFile(workBook) {
    const filePath = path.join(__dirname, "..", "files", "arquivo.xls");
    XLSX.writeFile(workBook, filePath);
  }
}

module.exports = XlsxService;
