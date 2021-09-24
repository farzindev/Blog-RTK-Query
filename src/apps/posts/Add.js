import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useAddPostMutation } from "./_api";
import { useState } from "react";

const Add = () => {
    const history = useHistory();

    const [
        addPost,
        { isLoading: updating, isSuccess: saved }
    ] = useAddPostMutation();

    const [post, setpost] = useState({});

    const save = (e) => {
        e.preventDefault();
        addPost(post)
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

    return (
        <form onSubmit={save} className="form">
            <h2>Add Post</h2>

            <label>Title</label>
            <input onChange={handler} name="title" type="text" />

            <label>Content</label>
            <textarea onChange={handler} name="content" rows="10"></textarea>

            <footer className="form-footer">
                <Link className="btn btn-default" to="/">Cancel</Link>
                <button className="btn btn-primary" type="submit">{updating ? "Adding..." : "Add"}</button>
            </footer>

            {saved && (
                <div className="alert">
                    Post has been added. redirecting...
                </div>
            )}
        </form>
    )
}

export default Add
