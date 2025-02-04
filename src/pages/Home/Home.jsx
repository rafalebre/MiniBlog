import styles from './Home.module.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  // Importante: passamos null como segundo parâmetro para não afetar a query principal
  const { documents: posts, loading, hasMore } = useFetchDocuments("posts", null, null, page);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (query.trim()) {
      return navigate(`/search?q=${query.trim()}`);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.home}>
      <h1>Check our latest posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Or search by tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-dark">Search</button>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {posts && posts.length > 0 && 
          posts.map((post) => <PostDetail key={post.id} post={post} />)
        }
        {posts && posts.length === 0 && !loading && (
          <div className={styles.noposts}>
            <p>No posts were found</p>
            <Link to="/posts/create" className="btn">Create first post</Link>
          </div>
        )}
        {!loading && hasMore && (
          <button onClick={handleLoadMore} className="btn">Load More</button>
        )}
      </div>
    </div>
  );
};

export default Home;