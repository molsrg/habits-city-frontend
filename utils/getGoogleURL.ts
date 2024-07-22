function getGoogleOAuthURL() {
    //Хорошим тоном будет перенести client_id в конфиг или что-то такое, но не критично
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'

    const options = {
        redirect_uri: 'http://localhost:5000/auth/google/',
        client_id: '781213909960-8j9l2oeqm6oj2tif476knk8r1net1kol.apps.googleusercontent.com',
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