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
    const columnsToFormat = ["createdAt", "updatedAt"];
    const columnsToFormatPositions = [];

    var ref = XLSX.utils.decode_range(workSheet["!ref"]);

    // obter as posições das colunas que deverão ser formatadas
    for (var columnPosition = 0; columnPosition <= ref.e.c; ++columnPosition) {
      const columnName =
        workSheet[XLSX.utils.encode_cell({ r: 0, c: columnPosition })].v;

      if (columnsToFormat.includes(columnName)) {
        columnsToFormatPositions.push(columnPosition);
      }
    }

    // Iterando em cada linha das posições das colunas
    columnsToFormatPositions.forEach((column) => {
      for (var rowPosition = 1; rowPosition <= ref.e.r; ++rowPosition) {
        workSheet[XLSX.utils.encode_cell({ r: rowPosition, c: column })].z =
          "0";
      }
    });
  }

  createWorkBook(workSheet, sheetName) {
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);

    return workBook;
  }

  writeFile(workBook) {
    const filePath = path.join(__dirname, "..", "files", "arquivo.xls");
    XLSX.writeFile(workBook, filePath);
  }
}

module.exports = XlsxService;
