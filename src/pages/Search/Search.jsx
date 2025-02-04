import styles from "./Search.module.css"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"
import PostDetail from "../../components/PostDetail"
import { Link } from "react-router-dom"

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts, loading } = useFetchDocuments("posts", search);

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div>
                {loading && <p>Loading...</p>}
                
                {!loading && posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No results have been found for "{search}"</p>
                        <Link to="/" className="btn btn-dark">Back</Link>
                    </div>
                )}

                {!loading && posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search;