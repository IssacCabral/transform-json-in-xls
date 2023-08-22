const AWS = require("aws-sdk");

var credentials = new AWS.SharedIniFileCredentials({ profile: "luby-dev" });
AWS.config.update({ region: "us-east-1" });
AWS.config.credentials = credentials;

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const TABLE_NAME = "FgtsProposals";

module.exports = [ddb, TABLE_NAME, AWS];
