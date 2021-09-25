import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useGetPostQuery, useEditPostMutation, useDeletePostMutation } from "./_api";
import { useState, useEffect } from "react";

const Edit = ({ match }) => {
    const history = useHistory();
    const postId = match.params.id;
    const [deletePost] = useDeletePostMutation();
    const [
        editpost,
        { isLoading: updating, isSuccess: saved }
    ] = useEditPostMutation();
    const { data: postData, isSuccess: postDataReady } = useGetPostQuery(postId);
    const [post, setpost] = useState({ title: "", content: "" });

    useEffect(() => {
        if (postDataReady) {
            setpost(postData);
        }
    }, [postData, postDataReady]);

    const update = (e) => {
        e.preventDefault();
        editpost(post)
            .unwrap()
            .then(() => {
                goBack(1500);
            });
    };

    const handler = (e) => {
        const { name, value } = e.target;
        setpost({ ...post, [name]: value });
    };

    const goBack = (time) => {
        setTimeout(() => {
            history.push("/posts/");
        }, time);
    };


    const remove = () => {
        deletePost(postId)
        history.push("/posts/");
    }



    return (
        <form onSubmit={update} className="form">
            <h2>Edit Post</h2>

            <label>Title</label>
            <input onChange={handler} value={post.title} name="title" type="text" required />

            <label>Content</label>
            <textarea onChange={handler} value={post.content} name="content" rows="10"></textarea>

            <footer className="form-footer">
                <Link className="btn btn-default" to="/">Cancel</Link>
                <button className="btn btn-danger" type="button" onClick={remove}>Delete</button>
                <button className="btn btn-primary" type="submit">{updating ? "Saving..." : "Save"}</button>
            </footer>

            {saved && (
                <div className="alert alert-primary">
                    Post saved. redirecting...
                </div>
            )}
        </form>
    )
}

export default Edit
