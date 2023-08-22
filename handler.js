const xlsx = require("xlsx");
const AWS = require("aws-sdk");

var credentials = new AWS.SharedIniFileCredentials({ profile: "luby-dev" });
AWS.config.update({ region: "us-east-1" });
AWS.config.credentials = credentials;

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const TABLE_NAME = "FgtsProposals";

async function getProposals() {
  const proposals = [];

  /** @type { AWS.DynamoDB.ScanInput } */
  const params = {
    TableName: TABLE_NAME,
  };

  const scanResult = await ddb.scan(params).promise();

  scanResult.Items.forEach((item) => {
    const proposal = AWS.DynamoDB.Converter.unmarshall(item);
    proposals.push(proposal);
  });

  return proposals;
}

(async () => {
  const result = await getProposals();
  const workSheet = xlsx.utils.json_to_sheet(result);

  workSheet["F2"].z = '"$"#,##0.00_);\\("$"#,##0.00\\)';
  workSheet["F3"].z = "#,##0";
  workSheet["F4"].z = "0.00%";

  const workBook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workBook, workSheet, "Sheet 1");

  // const blob = xlsx.write(workBook, { bookType: "xls", type: "buffer" });

  // const base64 = blob.toString("base64");

  // const myFile = xlsx.read(base64);

  xlsx.writeFile(workBook, "./arquivo.xls");
})();
