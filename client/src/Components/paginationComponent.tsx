import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../Context/authContext'
import { AppDispatch } from '../Redux'
import { getBlogsLimit, RootState } from '../Redux/blog-slice'
import ButtonComponent from './buttonComponent'

const PaginationComponent : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {currentUser: {uid}} = useAuth()
    const blogs = useSelector((state: RootState) => state.blog.blogs)
    const limit = 3
    const totalBlogs = blogs.length
    const numberOfPages = Math.ceil(totalBlogs/limit)
    const handlePageClick = async (e: any) => {
        await dispatch(getBlogsLimit({currentUserUid: uid, page: e.target.innerText, limit: limit.toString()}))
    }
    const PaginateNotes = () => {
        let blogPaginate = []
        for(let i = 1; i <= numberOfPages+1; i++){
            blogPaginate.push(i)
        }
        return blogPaginate.map((each) => {
            return (
                <div key={each}>
                    <ul>
                        <li>
                        <ButtonComponent onClick={handlePageClick}>{each}</ButtonComponent>                            
                        </li>
                    </ul>
                </div>
            )
        })
    }
    return (
        <div>
            <div className='text-center flex justify-center gap-2'>
            {PaginateNotes()}
            </div>
        </div>
    )
}

export default PaginationComponent