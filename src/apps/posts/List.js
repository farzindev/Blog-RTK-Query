import { Link } from "react-router-dom";
import { useGetPostsQuery } from "./_api";
import ListItem from './ListItem'
const List = () => {
    const { data: posts } = useGetPostsQuery();

    return (
        <>
            <header className="post-header">
                <Link className="btn btn-primary" to="/posts/add/">Add Post</Link>
            </header>
            {posts?.map(item => <ListItem item={item} key={item.id} />)}
            {posts?.length === 0 &&
                <div className="alert alert-info">Ok, It doesn't have to be clever, just has to be words. <br /> Write something!</div>
            }
        </>
    )
}

export default List
