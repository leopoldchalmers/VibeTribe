import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tribe, Post } from "../api";
import axios from "axios";
import { UserContext } from "../UserContext";


export function TribeInfo() {
  const { id } = useParams<{ id: string }>();
  const [tribe, setTribe] = useState<Tribe | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: "", description: "", songLink: "" });
    const { user } = React.useContext(UserContext);

  useEffect(() => {
    const fetchTribe = async () => {
      try {
        const response = await axios.get<Tribe>(`http://localhost:8080/tribes/${id}`);
        setTribe(response.data);
      } catch (error) {
        console.error("Error fetching tribe:", error);
      }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get<Post[]>(`http://localhost:8080/posts`);
            setPosts(response.data.filter((post) => post.tribe.id === Number(id)));
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        };

    fetchTribe();
    fetchPosts();
  }, [id]);

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not logged in");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/posts", {
        ...newPost,
        author: user.username,
        tribe: tribe,
      });
      setPosts([...posts, response.data]);
      setNewPost({ title: "", description: "", songLink: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };


  if (!tribe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div>
            <h1>{tribe.title}</h1>
            <p>{tribe.description}</p>
            <p>Owner: {tribe.owner}</p>
            <p>Created At: {new Date(tribe.createdAt).toLocaleDateString()}</p>
            <p>Updated At: {new Date(tribe.updatedAt).toLocaleDateString()}</p>
        </div>
        <div>
            <h2>Create a new post</h2>
            <form onSubmit={handlePostSubmit}>
                <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handlePostChange}
                />
                </div>
                <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={newPost.description}
                    onChange={handlePostChange}
                />
                </div>
                <div>
                <label htmlFor="songLink">Song Link:</label>
                <input
                    type="text"
                    id="songLink"
                    name="songLink"
                    value={newPost.songLink}
                    onChange={handlePostChange}
                />
                </div>
                <button type="submit">Create Post</button>
            </form>
            </div>
        </div>
    
    
  );
}