// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store';
import { config } from '../config';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: config.baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            // const cachedTokenString = localStorage.getItem(`@@auth0spajs@@::${config.authConfig.clientId}::${config.authConfig.audience}::${config.authConfig.scopes.join(" ")}`) as any;
            
            // const cachedToken = JSON.parse(cachedTokenString);

            // console.log(cachedToken);

            // if (cachedToken?.body?.access_token) {
            //     headers.set("Authorization", `Bearer ${cachedToken.body.access_token}`);
            // }

            // TODO: find a way to check if the related request needs an access token
            if (state.auth.token) {
                headers.set("Authorization", `Bearer ${state.auth.token}`);
            }

            return headers;
        },
    }),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})