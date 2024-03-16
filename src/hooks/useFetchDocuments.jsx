import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, limit } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null, page = 1) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchDocuments = async () => {
      const collectionRef = collection(db, docCollection);
      let q = query(collectionRef, orderBy("createAt", "desc"), limit(10 * page + 1)); // Solicita um documento a mais para verificar se há mais.

      if (search) {
        q = query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createAt", "desc"), limit(10 * page + 1));
      } else if (uid) {
        q = query(collectionRef, where("uid", "==", uid), orderBy("createAt", "desc"), limit(10 * page + 1));
      }

      onSnapshot(q, (snapshot) => {
        const isMore = snapshot.docs.length > 10 * page;
        const newDocuments = snapshot.docs.slice(0, 10 * page).map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(prevDocs => page === 1 ? newDocuments : [...prevDocs, ...newDocuments.slice(prevDocs.length)]); // Acumula os documentos de maneira correta.
        setHasMore(isMore);
        setLoading(false);
      }, (error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
    };

    fetchDocuments();
  }, [docCollection, search, uid, page]);

  return { documents, loading, error, hasMore };
};
