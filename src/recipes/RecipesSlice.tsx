
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Recipe = {
    id: number,
    title: string
}

export const fetchData = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            console.log('in async thunk');
            const response = await axios.get('http://localhost:3000/api/recipes')
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message)
        }
    }
)

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe:Recipe, thunkAPI) => {
        try {
            console.log('in async thunk');
            const response = await axios.get('http://localhost:3000/api/recipes')
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message)
        }
    }
)

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { list: [] as Recipe[], loading: true },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled,
                (state, action) => {
                    console.log('fulfilled');
                    state.list = action.payload
                })
            .addCase(fetchData.rejected,
                (state) => {
                    console.log('failed');
                }
            )
            .addCase(addRecipe.fulfilled,
                (state, action) => {
                    state.list.push(action.payload);
            })
            .addCase(addRecipe.rejected,
                (state, action) => {
                    console.log('add recipe failed', action.payload);
                }
            )
    }
});
export default recipesSlice;