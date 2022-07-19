import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../Redux'
import { getBlogs, RootState } from '../Redux/blog-slice'
import {BlogInterface} from '../../../server/Interface/blogInterface'
import BlogDetailsComponent from '../Components/blogDetailsComponent'
import { CONSTANTS } from '../Constants/constants' 
import NoticeComponent from '../Components/noticeComponent'

const Blog : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const blogs = useSelector((state: RootState) => state.blog.blogs)
    const loading = useSelector((state: RootState) => state.blog.loading)    
    const error = useSelector((state: RootState) => state.blog.errors)
    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])
    return (
        <div>
            <div>
                {loading.getAll && <NoticeComponent message={CONSTANTS.LOADING}/>}
                {!error.getAll && !loading.getAll && blogs && !(blogs.length > 0) && <NoticeComponent message={CONSTANTS.NO_BLOGS}/>}
                {error.getAll && <h1>error</h1>}
                <div className='space-y-4 p-4'>
                {blogs.map((each: BlogInterface) => {
                    return (
                        <div key={each.uid}>
                            <BlogDetailsComponent {...each}/>
                        </div>
                    )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Blog

