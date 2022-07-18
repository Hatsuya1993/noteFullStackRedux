import express from 'express'
import { home, postNewBlog } from '../Controller/blogController'

export const blogRoutes = express.Router()

blogRoutes.route("/home").get(home)

blogRoutes.route("/home/add").post(postNewBlog)
