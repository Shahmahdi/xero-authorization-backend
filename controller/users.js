const { jwtDecode } = require("jwt-decode");
const { getTokensByXeroCode } = require("../model/Xero");
const { getAccessToken, getUserInfo, createAuth0User } = require("../model/Auth0");
const { generateRandomPassword } = require("../utils/randomPasswordGenerate");

exports.getOrCreateAuth0User = async (ctx) => {
  try {
    const { code, redirectUrl } = ctx.request.body;
    
    const xeroResponse = await getTokensByXeroCode(code, redirectUrl);
    
    let decodedData = {};
    if (xeroResponse && xeroResponse.data && xeroResponse.data.id_token) {
      decodedData = jwtDecode(xeroResponse.data.id_token);
    }
    // console.log("======",decodedData);
    const accessToken = await getAccessToken();
    // console.log(`accessToken: `, accessToken);
    const userInfo = await getUserInfo(accessToken, decodedData.email);
    // console.log(`userInfo: `,userInfo);
    if (userInfo.length === 0) {
      const randomPassword = generateRandomPassword(12);
      // console.log('Random Password:', randomPassword);
      const newUserInfo = await createAuth0User(accessToken, decodedData.email, randomPassword);
      // console.log(`----newUserInfo: `, newUserInfo);
    }
    ctx.body = decodedData;
  } catch (error) {
    // console.log(error);
    ctx.response.status = 400;
    ctx.response.message = error && error.response && error.response.data && error.response.data.error || "Something went wrong";
  }
};
