import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BlogInterface } from "../../../server/Interface/blogInterface";

export interface RootState {
    blog:{
        blogs: any[],
        loading: {
            getAll: boolean,
            deleteOne: boolean
        },
        errors: {
            getAll: boolean,
            deleteOne: boolean
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

export const deleteBlog = createAsyncThunk(
    "blog/deleteBlogs",
    async (uid: String) => {
        try {
            await axios.delete(`http://localhost:8200/home/delete/${uid}`)
            return uid
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
            getAll: false,
            deleteOne: false
        },
        errors: {
            getAll: false,
            deleteOne: false
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
        builder.addCase(deleteBlog.pending, (state) => {
            state.loading.deleteOne = true
            state.errors.deleteOne = false
        })
        builder.addCase(deleteBlog.fulfilled, (state, {payload}) => {
            const index = state.blogs.findIndex((blog: BlogInterface) => blog.uid === payload)
            state.blogs.splice(index,  1)
            state.loading.deleteOne = false
        })
        builder.addCase(deleteBlog.rejected, (state) => {
            state.loading.deleteOne = false
            state.errors.deleteOne = true
        })
    }
})

export const blogSlices = blogSlice.actions
export default blogSlice.reducer