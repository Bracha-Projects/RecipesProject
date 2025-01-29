import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./RecipesSlice";

const store = configureStore({
    reducer: combineSlices(
        recipesSlice
    )
});

export type StoreType = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch
export default store