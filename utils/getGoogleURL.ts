function getGoogleOAuthURL() {
    const config = useRuntimeConfig()

    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'

    console.log(`${config.public.clientIdGoogle}.apps.googleusercontent.com`)
    const options = {
        redirect_uri: 'http://localhost:3000/auth/pending/',
        client_id: `${config.public.clientIdGoogle}.apps.googleusercontent.com`,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid"
        ].join(" ")
    }
    const qs = new URLSearchParams(options)

    return `${rootURL}?${qs}`;
}


export default getGoogleOAuthURL;