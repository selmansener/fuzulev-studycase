import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Loading from "../../components/loading";

export const Unauthenticated = (props: React.PropsWithChildren) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />
    }

    return <React.Fragment>
        {!isAuthenticated && <div>
            {props.children}
        </div>}
    </React.Fragment>
}