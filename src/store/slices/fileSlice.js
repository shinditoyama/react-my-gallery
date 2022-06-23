import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFile } from "../../utils/functions";

export const getFiles = createAsyncThunk("getFiles", async () => {
    try {
        const data = await getAllFile();
        return data;
    } catch (err) {
        alert(err.message);
    }
});

export const fileSlice = createSlice({
    name: "file",
    initialState: {
        list: [],
        status: null
    },
    reducers: { },
    extraReducers: {
        [getFiles.pending]: (state) => {
            state.status = "loading";
        },
        [getFiles.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = "success";
            console.log(state.list);
        },
        [getFiles.rejected]: (state) => {
            state.status = "failed";
        }
    }
});

export default fileSlice.reducer;
