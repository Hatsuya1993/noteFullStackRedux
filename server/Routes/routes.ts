import express from 'express'
import { home } from '../Controller/blogController'

export const blogRoutes = express.Router()

blogRoutes.route("/home").get(home)
