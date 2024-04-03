import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { authSlice } from '../auth/auth';

export const authMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action: any) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            if (action?.payload?.status == 401) {
                api.dispatch(authSlice.actions.setToken(undefined));
            }
        }

        return next(action)
    }