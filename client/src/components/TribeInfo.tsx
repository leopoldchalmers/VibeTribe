import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Tribe, Post } from "../api";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Modal, Button, Form } from "react-bootstrap";

export function TribeInfo() {
  const { id } = useParams<{ id: string }>();
  const [tribe, setTribe] = useState<Tribe | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", description: "", songLink: "" });
  const { user } = useContext(UserContext);

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
        tribeId: Number(id),
      });
      setPosts([...posts, response.data]);
      setNewPost({ title: "", description: "", songLink: "" });
      setShowModal(false);
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
        <Button variant="primary" onClick={() => setShowModal(true)} style={{ position: "absolute", top: "100px", right: "10px" }}>
          New Post
        </Button>
      </div>
      <div>
        <h2>Posts</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Song Link: <a href={post.songLink} target="_blank" rel="noopener noreferrer">{post.songLink}</a></p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes}</p>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePostSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newPost.title}
                onChange={handlePostChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newPost.description}
                onChange={handlePostChange}
              />
            </Form.Group>
            <Form.Group controlId="songLink">
              <Form.Label>Song Link</Form.Label>
              <Form.Control
                type="text"
                name="songLink"
                value={newPost.songLink}
                onChange={handlePostChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}