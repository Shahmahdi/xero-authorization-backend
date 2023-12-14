const axios = require("axios");
const { auth0Domain, auth0ClientId, auth0ClientSecret, auth0Audience } = require("../variables");

const config = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
}

exports.getAccessToken = () => {
  const data = {
    grant_type: "client_credentials",
    client_id: auth0ClientId,
    client_secret: auth0ClientSecret,
    audience: auth0Audience
  };
  console.log(`data: `, data);
  return axios.post(`https://${auth0Domain}/oauth/token`, data, config).then((response) => {
    console.log("Auth0 authorization response: ", response.data);
    return response.data.access_token;
  }).catch(async error=> {
    console.log(`Auth0 authorization failed  while reAuthorize error response: `, error.response);
    throw error;
  });
}

exports.getUserInfo = async (token, email) => {
  return axios
    .get(
      `https://${auth0Domain}/api/v2/users-by-email?email=${email}`,
      { 
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    ).then((response) => response.data);
};

exports.createAuth0User = async (token, email, password) => {
  const reqData = {
    email,
    password,
    connection: "Username-Password-Authentication"
  };
  return axios
    .post(
      `https://${auth0Domain}/api/v2/users`,
      reqData,
      { 
        headers: {
          authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    ).then((response) => response.data);
}