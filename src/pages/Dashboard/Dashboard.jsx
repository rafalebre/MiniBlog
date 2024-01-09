import styles from "./Dashboard.module.css";

import {Link} from "react-router-dom";

// hooks
import {useAuthValue} from "../../context/AuthContext";
import {useFetchDocuments} from "../../hooks/useFetchDocuments"

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid);

  return (
    <div>
        <h2>Dashboard</h2>
        <p>Manage your posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>No posts have been found</p>
            <Link to="/posts/create" className="btn">
              Create first post
            </Link>
          </div>
        ) : (
          <div> 
            <p>There are posts!</p>
          </div>
        )}

        {posts && posts.map((post) => (
          <h3>{post.title}</h3>
        ))}
    </div>
  )
}

export default Dashboard