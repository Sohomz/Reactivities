import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
    },
    reducers: {
        isBusy: (state) => {
            state.isLoading = true;
        },
        isIdle: (state) => {
            state.isLoading = false;
        }
    }
});

export const { isBusy, isIdle } = uiSlice.actions;
export default uiSlice.reducer;