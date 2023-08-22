const XLSX = require("xlsx");
const getProposals = require("../db/data");
const path = require("path");

class XlsxService {
  async createWorkSheet() {
    const jsonData = await getProposals();
    const workSheet = XLSX.utils.json_to_sheet(jsonData);
    // console.log({ coluns: workSheet. });
    return workSheet;
  }

  formatSheet(workSheet) {
    workSheet["F2"].z = "0";
    workSheet["F3"].z = "0";
    workSheet["F4"].z = "0";
  }

  createWorkBook(workSheet, sheetName) {
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
    var ref = XLSX.utils.decode_range(workBook.Sheets[sheetName]["!ref"]);

    const columns = [];

    // obter os nomes das colunas
    for (var C = 0; C <= ref.e.c; ++C) {
      columns.push(
        workBook.Sheets[sheetName][XLSX.utils.encode_cell({ r: 0, c: C })].v
      );
    }

    console.log({ columns });

    return workBook;
  }

  writeFile(workBook) {
    const filePath = path.join(__dirname, "..", "files", "arquivo.xls");
    XLSX.writeFile(workBook, filePath);
  }
}

module.exports = XlsxService;
