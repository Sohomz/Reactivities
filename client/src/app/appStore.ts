import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import uiSlice from '../features/ui/uiSlice';

export const appStore=configureStore({
    reducer: {
        abcd:counterSlice,
        ui: uiSlice,
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;