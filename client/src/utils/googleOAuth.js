
export const getGoogleOAuthURL = () => {

  // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
  const GoogleOAuthRootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL,
      response_type : "token",
      prompt: "select_account",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      ].join(" "),
  }

  const qs = new URLSearchParams(options);
  console.log(qs.toString());
  return GoogleOAuthRootUrl + "?" + qs.toString()
}