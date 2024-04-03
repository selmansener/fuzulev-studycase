import { EnvConfig } from "./shared";

export const config: EnvConfig = {
    baseUrl: "https://academy-plus-temp-api.azurewebsites.net",
    authConfig: {
        domain: "selman-personal.eu.auth0.com",
        clientId: "Fwa753w2BpErTcVb4bi1AGIUsUVh8aXG",
        redirectUri: "https://agreeable-hill-04b7c0d03.5.azurestaticapps.net",
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

