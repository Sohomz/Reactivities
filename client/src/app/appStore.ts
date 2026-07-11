import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';

export const appStore=configureStore({
    reducer: {
        abcd:counterSlice,
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;