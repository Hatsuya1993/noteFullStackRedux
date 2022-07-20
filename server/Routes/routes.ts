import express from 'express'
import { home, postNewBlog, deleteBlog, deleteAllBlog } from '../Controller/blogController'

export const blogRoutes = express.Router()

blogRoutes.route("/home").get(home)

blogRoutes.route("/home/add").post(postNewBlog)

blogRoutes.route("/home/delete/:uid").delete(deleteBlog)

blogRoutes.route("/home/deleteAll/:userid").delete(deleteAllBlog)