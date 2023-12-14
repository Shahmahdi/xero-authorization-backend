const xeroClientId = process.env.XERO_CLIENT_ID;
const xeroClientSecret = process.env.XERO_CLIENT_SECRET;
const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0ClientId = process.env.AUTH0_CLIENT_ID;
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;
const auth0Audience = process.env.AUTH0_AUDIENCE;

module.exports = {
  xeroClientId,
  xeroClientSecret,
  auth0Domain,
  auth0ClientId,
  auth0ClientSecret,
  auth0Audience
};
