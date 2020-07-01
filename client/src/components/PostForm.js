import React, { useContext, useRef } from 'react'
import { PostContext } from '../providers/PostProvider'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const NewPostForm = (props) => {

    const { addPost } = useContext(PostContext)

    const title = useRef("")
    const imageUrl = useRef()
    const caption = useRef()
    const userProfileId = useRef()

    const constructNewPost = () => {

        addPost({
            title: title.current.value,
            imageUrl: imageUrl.current.value,
            caption: caption.current.value,
            dateCreated: "2020-06-22T00:00:00",
            userProfileId: parseInt(userProfileId.current.value)
        })
    }

    return (
        <Form>
            <FormGroup>
                <Label htmlFor="title">Post Title</Label>
                <Input type="text" name="title" id="postTitle" placeholder="Enter post title" innerRef={title} required autoFocus />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="imageUrl">Gif URL</Label>
                <Input type="text" name="imageUrl" id="postImageUrl" placeholder="Enter a url for your gif" innerRef={imageUrl} required autoFocus />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="caption">Caption</Label>
                <Input type="text" name="caption" id="postCaption" placeholder="Enter a caption for your gif" innerRef={caption} required autoFocus />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="userProfileId">User Profile Id</Label>
                <Input type="select" name="userProfileId" id="postUserProfileId" innerRef={userProfileId} required autoFocus>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>
            <Button type="submit" onClick={(e) => {
                e.preventDefault()
                constructNewPost()
            }}>Submit</Button>
        </Form>
    )
}