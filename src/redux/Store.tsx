import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./RecipesSlice";
import { ErrorMessage } from "./ErrorSlice";

const store = configureStore({
    reducer: combineSlices(
        recipesSlice,
        ErrorMessage
    )
});

export type StoreType = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch
export default store