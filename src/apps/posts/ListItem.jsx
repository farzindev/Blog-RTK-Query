import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
    return (
        <article className="post">
            <h2><Link to={`/posts/edit/${item.id}`}>{item.title}</Link></h2>
            <p>{item.content}</p>
            <footer>
                {item.published ?
                    <time>{new Date(item.date).toLocaleDateString()}</time>
                    :
                    <span>Draft</span>
                }
                <Link to={`/posts/edit/${item.id}`}>Edit</Link>
            </footer>
        </article>
    )
}

export default ListItem
