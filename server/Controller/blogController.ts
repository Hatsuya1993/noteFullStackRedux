import {Request,Response} from 'express'
import { Error } from 'mongoose'
import { BlogInterface } from '../Interface/blogInterface'
import { Blog } from '../Models/blogModel'

export const home = async (req: Request, res: Response) => {
    const userUid = req.params.userUid
    if(req.query.page && req.query.limit){
    const page : number = parseInt(req.query.page!.toString())
    const limit : number = parseInt(req.query.limit!.toString())
    const startIndex = (page - 1) * limit
    const endPage = page * limit
    Blog.find({user: userUid}, (err: Error, result: BlogInterface[]) => {
        if(err){
            res.json({
                "Response": res.statusCode,
                "Error message": err
            })
        }
        else{
            console.log(result.slice(startIndex, endPage),4567, startIndex, endPage)
            res.json({
                data: result.slice(startIndex, endPage), currentPage: page
            })
        }
    })
    }
    else{
        Blog.find({user: userUid}, (err: Error, result: BlogInterface[]) => {
            if(err){
                res.json({
                    "Response": res.statusCode,
                    "Error message": err
                })
            }
            else{
                res.json({
                    data: result,
                    currentPage: 1
                })
            }
        })
    }
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