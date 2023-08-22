const [ddb, TABLE_NAME, AWS] = require("./config");

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

module.exports = getProposals;
