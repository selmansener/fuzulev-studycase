export interface AuthConfig {
    domain: string;
    clientId: string;
    redirectUri: string;
    audience: string;
    scopes: string[];
    defaultScopes: string;
}

export interface EnvConfig {
    baseUrl: string;
    authConfig: AuthConfig;
    socialMediaLinks: {
        instagram: string;
        facebook: string;
        twitter: string;
        linkedIn: string;
    }
}
