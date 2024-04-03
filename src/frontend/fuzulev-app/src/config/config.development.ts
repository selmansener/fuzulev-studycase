import { EnvConfig } from "./shared";


export const config: EnvConfig = {
    baseUrl: "https://localhost:7021",
    authConfig: {
        domain: "selman-personal.eu.auth0.com",
        clientId: "change_me",
        redirectUri: "https://change_me.com:3000",
        audience: "https://change_me.com",
        scopes: [
            "openid", 
            "profile", 
            "email",
            "offline_access"
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

