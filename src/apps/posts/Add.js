import { Link } from "react-router-dom";
const Add = () => {
    return (
        <form className="form">
            <h2>Add Post</h2>

            <label>Title</label>
            <input name="title" type="text" />

            <label>Content</label>
            <textarea name="content" rows="10"></textarea>

            <footer className="form-footer">
                <Link className="btn btn-default" to="/">Cancel</Link>
                <button className="btn btn-primary" type="submit">Add</button>
            </footer>
        </form>
    )
}

export default Add
