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
})();
