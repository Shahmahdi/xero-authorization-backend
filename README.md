https://devblog.xero.com/adding-sign-in-with-xero-to-auth0-2a8bcde682ba

- Get the xero authorization code from req body
- Get the xero access token using the code.
- decode the access token
- check the email is exists in auth0
- if not, then create the user in auth0
