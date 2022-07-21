import {Request,Response} from 'express'
import { Error } from 'mongoose'
import { BlogInterface } from '../Interface/blogInterface'
import { Blog } from '../Models/blogModel'

export const home = async (req: Request, res: Response) => {
    Blog.find({}, (err: Error, result: BlogInterface[]) => {
        if(err){
            res.json({
                "Response": res.statusCode,
                "Error message": err
            })
        }
        else{
            res.json({
                data: result
            })
        }
    })
}

export const postNewBlog = async (req: Request, res: Response) => {
    const blogBody = req.body
    try {
        const newBlog = new Blog(blogBody)
        await newBlog.save()
        res.json({
            data: newBlog
        })
    } catch (error) {
        res.json({
            "Response": res.statusCode,
            "Error message": error
        })
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    const uid = req.params.uid
    try {
        await Blog.findOneAndRemove({uid: uid})
        res.json({
            message: `Delete blog ${uid} successfully`
        })
    } catch (error) {
        res.json({
            statusCode: res.statusCode,
            message: error
        })
    }
}

export const deleteAllBlog = async (req: Request, res: Response) => {
    const userid = req.params.userid
    try {
        await Blog.deleteMany({user: userid})
        res.json({
            message: `Delete all blogs for user ${userid} successfully`
        })
    } catch (error) {
        res.json({
            statusCode: res.statusCode,
            message: error
        })
    }
}

export const createBlog = async (req: Request, res: Response) => {
    const bodyData = req.body
    try {
        const newBlog = new Blog(bodyData)
        await newBlog.save()
        res.json(newBlog)
    } catch (error) {
        res.json({
            statusCode: res.statusCode,
            message: error
        })
    }
}

export const editBlog = async (req: Request, res: Response) => {
    const uid = req.params.uid
    const data = req.body
    try {
        await Blog.findOneAndUpdate({uid: uid}, data)
        res.json(data)
    } catch (error) {
        res.json({
            statusCode: res.statusCode,
            message: error
        })
    }
}