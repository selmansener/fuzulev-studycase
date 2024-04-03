import { EnvConfig } from "./shared";


export const config: EnvConfig = {
    baseUrl: "https://api.academyplus.com:7021",
    authConfig: {
        domain: "selman-personal.eu.auth0.com",
        clientId: "Fwa753w2BpErTcVb4bi1AGIUsUVh8aXG",
        redirectUri: "https://academyplus.com:3000",
        audience: "https://academyplus.com",
        scopes: [
            "openid", 
            "profile", 
            "email",
            "offline_access",
            "read:playlists"
        ],
        defaultScopes: "openid profile email offline_access"
    },
    socialMediaLinks: {
        instagram: "https://www.instagram.com/modilistcom/",
        facebook: "https://www.facebook.com/modilistcom",
        twitter: "https://twitter.com/modilistcom",
        linkedIn: "https://www.linkedin.com/company/modilist/"
    }
};

