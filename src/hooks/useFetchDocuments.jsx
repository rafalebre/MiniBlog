import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, limit } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null, page = 1) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchDocuments = async () => {
      const collectionRef = collection(db, docCollection);
      let q = query(collectionRef, orderBy("createAt", "desc"), limit(10 * page));

      if (search) {
        q = query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createAt", "desc"), limit(10 * page));
      } else if (uid) {
        q = query(collectionRef, where("uid", "==", uid), orderBy("createAt", "desc"), limit(10 * page));
      }

      onSnapshot(q, (snapshot) => {
        const newDocuments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(newDocuments); // Acumula os documentos sem cortar os anteriores
        setHasMore(snapshot.docs.length > 0);
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
