import {Request,Response} from 'express'
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