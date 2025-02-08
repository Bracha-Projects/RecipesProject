import { createSlice } from "@reduxjs/toolkit";

export const ErrorMessage = createSlice({
    name: 'ErrorMessage',
    initialState: { errorMessage: '' },
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
});
export const {setError} = ErrorMessage.actions;
export default ErrorMessage.reducer;