// CSS
import styles from './Home.module.css';

// hooks
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { documents: posts, loading, hasMore } = useFetchDocuments("posts", query, null, page);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.home}>
      <h1>Check our latest posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Or search by tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-dark">Search</button>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts.length === 0 && !loading && (
          <div className={styles.noposts}>
            <p>No posts were found</p>
            <Link to="/posts/create" className="btn">Create first post</Link>
          </div>
        )}
        {!loading && hasMore ? (
          <button onClick={handleLoadMore} className="btn">Load More</button>
        ) : (
          !loading && <button disabled className="btn" style={{ opacity: 0.5 }}>No more posts</button>
        )}
      </div>
    </div>
  );
};


export default Home;
