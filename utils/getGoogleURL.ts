function getGoogleOAuthURL() {
  const config = useRuntimeConfig();

  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const redirectUri = process.env.NODE_ENV === 'development' ? config.public.redirectUriGoogleDev : config.public.redirectUriGoogleProd;
  const options = {
    redirect_uri: redirectUri,
    client_id: `${config.public.clientIdGoogle}`,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid'].join(' '),
  };
  const qs = new URLSearchParams(options);

  return `${rootURL}?${qs}`;
}

export default getGoogleOAuthURL;
