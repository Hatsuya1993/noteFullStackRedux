import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface RootState {
    blog:{
        blogs: any[],
        loading: {
            getAll: boolean
        },
        errors: {
            getAll: boolean
        }
    }
}

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async () => {
        try {
            const res = await axios.get(`http://localhost:8200/home`)
            const data = await res.data
            return data
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
)

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        loading: {
            getAll: false
        },
        errors: {
            getAll: false
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state) => {
            state.loading.getAll = true            
            state.errors.getAll = false
        })
        builder.addCase(getBlogs.fulfilled, (state, {payload}) => {
            state.loading.getAll = false
            state.blogs = payload.data
        })
        builder.addCase(getBlogs.rejected, (state) => {
            state.loading.getAll = false
            state.errors.getAll = true
        })
    }
})

export const blogSlices = blogSlice.actions
export default blogSlice.reducer