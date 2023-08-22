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
    workSheet["F2"].z = "0";
    workSheet["F3"].z = "0";
    workSheet["F4"].z = "0";
  }

  createWorkBook(workSheet, sheetName) {
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
    var ref = XLSX.utils.decode_range(workBook.Sheets[sheetName]["!ref"]);

    const columns = [];

    /**
     * Vou precisar iterar pelas colunas, e buscar as posições que tiverem
     * os campos createdAt, updatedAt
     *
     * Após isso, eu faço uma interação nessas colunas, para alterar célula por célula
     * realizando a formatação correta
     */
    // obter os nomes das colunas
    for (var columnPosition = 0; columnPosition <= ref.e.c; ++columnPosition) {
      columns.push(
        workBook.Sheets[sheetName][
          XLSX.utils.encode_cell({ r: 0, c: columnPosition })
        ].v
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
