import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BlogInterface } from "../../../server/Interface/blogInterface";

export interface RootState {
    blog:{
        blogs: any[],
        loading: {
            getAll: boolean,
            deleteOne: boolean,
            deleteAll: boolean
            create: boolean,
            edit: boolean
        },
        errors: {
            getAll: boolean,
            deleteOne: boolean,
            deleteAll: boolean,
            create: boolean,
            edit: boolean
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

export const deleteAllBlog = createAsyncThunk(
    "blog/deleteAllBlogs",
    async (userId: String) => {
        try {
            await axios.delete(`http://localhost:8200/home/deleteAll/${userId}`)
            return userId
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
)

export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async (data: BlogInterface) => {
        try {
            const addBlog = await axios.post(`http://localhost:8200/home/create`, {
                uid: data.uid,
                title: data.title,
                description: data.description,
                kind: data.kind,
                user: data.user
            })
            return addBlog.data
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
)

export const editBlog = createAsyncThunk(
    "blog/editBlog",
    async (data: BlogInterface) => {
        try {
            const editBlog = await axios.put(`http://localhost:8200/home/edit/${data.uid}`, {
                uid: data.uid,
                title: data.title,
                description: data.description,
                kind: data.kind,
                user: data.user
            })
            return editBlog.data
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
)

const INITIAL_STATE: BlogInterface[] = []

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: INITIAL_STATE,
        loading: {
            getAll: false,
            deleteOne: false,
            deleteAll: false,
            create: false
        },
        errors: {
            getAll: false,
            deleteOne: false,
            deleteAll: false,
            create: false
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
        builder.addCase(deleteAllBlog.pending, (state) => {
            state.loading.deleteAll = true
            state.errors.deleteAll = false
        })
        builder.addCase(deleteAllBlog.fulfilled, (state, {payload}) => {
            state.blogs = state.blogs.filter((blog: BlogInterface) => blog.user !== payload)
            state.loading.deleteAll = false
        })
        builder.addCase(deleteAllBlog.rejected, (state) => {
            state.loading.deleteAll = false
            state.errors.deleteAll = true
        })
        builder.addCase(createBlog.pending, (state) => {
            state.loading.create = true
            state.errors.create = false
        })
        builder.addCase(createBlog.fulfilled, (state, {payload}) => {
            const addDate : BlogInterface = payload 
            state.blogs.unshift(addDate)
            state.loading.create = false
        })
        builder.addCase(createBlog.rejected, (state) => {
            state.loading.create = false
            state.errors.create = true
        })
        builder.addCase(editBlog.pending, (state) => {
            state.loading.create = true
            state.errors.create = false
        })
        builder.addCase(editBlog.fulfilled, (state, {payload}) => {
            state.loading.create = false
        })
        builder.addCase(editBlog.rejected, (state) => {
            state.loading.create = false
            state.errors.create = true
        })
    }
})

export const blogSlices = blogSlice.actions
export default blogSlice.reducer