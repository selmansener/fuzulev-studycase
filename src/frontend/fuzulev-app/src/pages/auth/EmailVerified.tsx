import Loading from "../../components/loading";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { config } from "../../config";

export default function EmailVerified() {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        loginWithRedirect({
            authorizationParams: {
                audience: config.authConfig.audience,
                redirect_uri: config.authConfig.redirectUri,
                prompt: "login",
                scope: config.authConfig.scopes.join(" "),
                ui_locales: "tr en-GB"
            }
        })
    }, []);

    return <Loading />
}