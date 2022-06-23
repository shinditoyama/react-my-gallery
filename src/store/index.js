import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import fileReducer from "./slices/fileSlice";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        file: fileReducer
    }
});