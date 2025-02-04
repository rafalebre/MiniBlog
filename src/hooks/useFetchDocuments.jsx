import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, limit } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null, page = 1) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasState] = useState(true);

  useEffect(() => {
    const fetchDocuments = () => {
      const collectionRef = collection(db, docCollection);
      let q;

      try {
        if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createAt", "desc"),
            limit(10 * page + 1)
          );
        } 
        else if (search) {
          const searchTerm = search.trim().toLowerCase();
          
          // Buscar todos os posts quando estiver pesquisando
          q = query(
            collectionRef,
            orderBy("createAt", "desc")
          );

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            
            querySnapshot.forEach((doc) => {
              const post = {
                id: doc.id,
                ...doc.data(),
              };
              
              // Inclui o post se alguma tag contém o termo de busca
              if (post.tagsArray.some(tag => tag.includes(searchTerm))) {
                docs.push(post);
              }
            });

            setDocuments(docs);
            setHasState(false);
            setLoading(false);
          });

          return () => unsubscribe();
        } 
        else {
          q = query(
            collectionRef,
            orderBy("createAt", "desc"),
            limit(10 * page + 1)
          );

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            
            querySnapshot.forEach((doc) => {
              docs.push({
                id: doc.id,
                ...doc.data(),
              });
            });

            setHasState(querySnapshot.docs.length > 10 * page);
            setDocuments(docs.slice(0, 10 * page));
            setLoading(false);
          });

          return () => unsubscribe();
        }

      } catch (error) {
        console.error("Error fetching documents:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [docCollection, search, uid, page]);

  return { documents, loading, error, hasMore: hasMore };
};