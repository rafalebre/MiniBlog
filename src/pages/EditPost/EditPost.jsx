import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument"

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {

        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ")

            setTags(textTags)
        }

    }, [post])

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")

        // validate image URL
        try {
            new URL(image)
        } catch (error) {
            setFormError("The image needs to be an URL.")
        }

        // criar o array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        // checar todos os valores
        if (!title || !image || !tags || !body) {
            setFormError("Please fill in all the fields!")
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // redirect to home page
        navigate("/")
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editing Post: {post.title}</h2>
                    <p>Change the info of your post as you wish</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Title:</span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Title of your post"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>Image URL:</span>
                            <input
                                type="text"
                                name="image"
                                required
                                placeholder="Insert an image that represents your post"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}>Preview of the current image:</p>
                        <img className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />
                        <label>
                            <span>Content:</span>
                            <textarea
                                name="body"
                                required
                                placeholder="Insert the content of your post"
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            > </textarea>
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input
                                type="text"
                                name="tags"
                                required
                                placeholder="Insert the tags separated by comma"
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>
                        {!response.loading && <button className="btn">Edit</button>}
                        {response.loading && (<button className="btn" disabled>Wait...</button>)}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost