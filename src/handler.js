const XlsxService = require("./service/xlsService");

(async () => {
  const xlsxService = new XlsxService();

  const workSheet = await xlsxService.createWorkSheet();
  xlsxService.formatSheet(workSheet);

  const workBook = xlsxService.createWorkBook();
  xlsxService.bookAppendSheet(workBook, workSheet, "Sheet 1");

  xlsxService.writeFile(workBook);
})();
