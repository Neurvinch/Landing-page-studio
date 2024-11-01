const crypto = require("crypto");

const client_id ="" // add th client id from google oath they given
// now we are creating CSRF token for security purpose 
const state = crypto.randomBytes(16).toString("hex");
// we are storing for verfication purpose..
localStorage.setItem("recentCSRFToken",state);


// Redirect the user to Google for OAuth
const redirectToGoogleOAuth = () => {

    //  We are using the client ID and the redirect URI to create the authorization URL
    // we using this to redirect to the origin website page after authentication 
    const redirectUri = encodeURIComponent(`${window.location.origin}/integrations/google/oauth2/callback`);
        // scope where we get or tell what we need userprofile and user email
    const scope = encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email");

    //   we tell that we need code and acces token and offline refresh token and state back to verify 
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&state=${state}`;
    
    window.location.href = authUrl;
  };

  redirectToGoogleOAuth();