import React from 'react'
import { BlogInterface } from '../../../server/Interface/blogInterface'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../Redux/blog-slice'
import { AppDispatch } from '../Redux'

const BlogDetailsComponent : React.FC<BlogInterface> = ({title, description, kind, uid}) => {
    const dispatch = useDispatch<AppDispatch>()
    const handleDelete = async () => {
        await dispatch(deleteBlog(uid))
    }
    return (
        <div className='bg-orange-400 p-3 rounded-md flex items-center justify-between'>
            <div>
            <h1 className='text-white text-3xl'>{title}</h1>
            <p className='text-white'>{description}</p>
            <p className='text-white'>{kind}</p>
            </div>
            <div className='flex gap-3 text-white text-2xl'>
                <BsFillTrashFill onClick={handleDelete}/>
                <BsFillPencilFill />
            </div>
        </div>
    )
}

export default BlogDetailsComponent