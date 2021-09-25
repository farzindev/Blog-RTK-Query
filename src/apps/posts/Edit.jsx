import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { useGetPostQuery, useEditPostMutation, useDeletePostMutation } from "./_api";

const Edit = ({ match }) => {
    const history = useHistory();
    const postId = match.params.id;
    
    const [post, setpost] = useState({ id: postId, title: "", content: "", published: true, date: "" });
    const { data: postData, isSuccess: postDataReady } = useGetPostQuery(postId);

    const [deletePost, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeletePostMutation();
    const [editpost, { isLoading: isUpdating, isSuccess: isSaved }] = useEditPostMutation();

    useEffect(() => {
        if (postDataReady) {
            setpost(postData);
        }
    }, [postData, postDataReady]);

    const updatePost = (e) => {
        e.preventDefault();
        editpost(post);
        goBack(700);
    };
    
    const removePost = () => {
        deletePost(postId);
        goBack(700);
    }

    const inputHandler = (e) => {
        const { name, value, checked } = e.target;
        let theValue = name === "published" ? checked : value
        setpost({ ...post, [name]: theValue });
    };

    const goBack = (time) => {
        setTimeout(() => {
            history.push("/posts/");
        }, time);
    };

    return (
        <form onSubmit={updatePost} className="form">
            <h2>Edit Post</h2>

            <label htmlFor="title">Title</label>
            <input onChange={inputHandler} value={post.title} name="title" id="title" type="text" className="form-control" required />

            <label htmlFor="content">Content</label>
            <textarea onChange={inputHandler} value={post.content} name="content" id="content" className="form-control" rows="10"></textarea>

            <input onChange={inputHandler} name="published" id="published" type="checkbox" className="form-checkbox" checked={post.published} />
            <label htmlFor="published">Publishd</label>

            <footer className="form-footer">
                <Link className="btn btn-default" to="/">Cancel</Link>
                <button className="btn btn-danger" type="button" onClick={removePost}>{isDeleting ? "Deleting..." : "Delete"}</button>
                <button className="btn btn-primary" type="submit">{isUpdating ? "Saving..." : "Save"}</button>
            </footer>

            {isSaved && (<div className="alert alert-primary">Post saved. redirecting...</div>)}
            {isDeleted && (<div className="alert alert-danger">Post Deleted. redirecting...</div>)}
        </form>
    )
}

export default Edit
