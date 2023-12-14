const axios = require("axios");
const { xeroClientId, xeroClientSecret } = require("../variables");

exports.getTokensByXeroCode = async (code, redirectUrl) => {
  const config = {
    headers: {
      authorization: "Basic " + Buffer.from(xeroClientId + ":" + xeroClientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  return axios.post(
    "https://identity.xero.com/connect/token",
    {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUrl
    },
    config
  );
};
