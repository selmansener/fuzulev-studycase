import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MsalState {
    token?: string
}

const initialState: MsalState = {
    token: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | undefined>) => {
            state.token = action.payload
        }
    },
});

export default authSlice.reducer;