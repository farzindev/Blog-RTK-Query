import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
    return (
        <article className="post">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <footer>
                <time>25 March, 2021</time>
                <button>Delete</button>
                <Link to={`/posts/edit/${item.id}`}>Edit</Link>
            </footer>
        </article>
    )
}

export default ListItem
