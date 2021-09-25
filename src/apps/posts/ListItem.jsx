import { Link } from "react-router-dom";

import { useDeletePostMutation } from "./_api";
const ListItem = ({ item }) => {
    const [deletePost] = useDeletePostMutation();
    return (
        <article className="post">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <footer>
                <time>25 March, 2021</time>
                <button onClick={() => deletePost(item.id)} type="button">Delete</button>
                <Link to={`/posts/edit/${item.id}`}>Edit</Link>
            </footer>
        </article>
    )
}

export default ListItem
