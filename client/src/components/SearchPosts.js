import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../providers/PostProvider'
import Post from './Post'

export const SearchPosts = (props) => {
    const { posts, searchPosts, getAllPosts } = useContext(PostContext)
    const [terms, setTerms] = useState(null)

    useEffect(() => {
        getAllPosts()
    }, [])

    useEffect(() => {
        searchPosts(terms)
    }, [terms])

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="searchTerms">Search:</label>
                    <input
                        onChange={(e) => {
                            setTerms(e.target.value)
                        }}
                        type="text"
                        id="searchTerms"
                        required
                        autoFocus
                        className="form-control"
                    />
                </div>
            </fieldset>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}