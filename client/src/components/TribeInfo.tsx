import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Tribe, Post, getPostsByTribeId, createPost, getTribeById } from "../api/api";
import { UserContext } from "../context/UserContext";
import { Modal, Button, Form } from "react-bootstrap";
import "./TribeInfo.css";

export function TribeInfo() {
  /**
   * The TribeInfo component is a component that displays the details of a single tribe
   * The TribeInfo component takes the tribe id from the URL and fetches the tribe and its posts from the server
   * The TribeInfo component displays the tribe's title, description, owner, and creation date
   * The TribeInfo component displays the posts of the tribe
   * The TribeInfo component has a button that allows the user to create a new post
   */
  
  const { id } = useParams<{ id: string }>();
  const [tribe, setTribe] = useState<Tribe | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", description: "", songLink: "" });
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTribe = async () => {
      try {
        const tribe = await getTribeById(Number(id)); 
        setTribe(tribe);
      } catch (error) {
        console.error("Error fetching tribe:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const posts = await getPostsByTribeId(Number(id)); 
        setPosts(posts);
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
      alert("You must be logged in to create a post");
      return;
    }
    try {
      const post = await createPost(newPost.title, newPost.description, user.username, Number(id), newPost.songLink);
      setPosts([...posts, post]);
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
    <div className="tribe-info-container">
      <div className="tribe-details">
        <h1>{tribe.title}</h1>
        <p>{tribe.description}</p>
        <p>Owner: {tribe.owner}</p>
        <p>Created At: {new Date(tribe.createdAt).toLocaleDateString()}</p>
        <p>Updated At: {new Date(tribe.updatedAt).toLocaleDateString()}</p>
        <Button variant="primary" className="postButton" onClick={() => setShowModal(true)} style={{ position: "absolute", top: "100px", right: "10px" }}>
          New Post
        </Button>
      </div>
      <div className="post-list">
        <h2>Posts</h2>
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Music Link: <a href={post.songLink} target="_blank" rel="noopener noreferrer">{post.songLink}</a></p>
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
              <Form.Label>Music Link</Form.Label>
              <Form.Control
                type="text"
                name="songLink"
                value={newPost.songLink}
                onChange={handlePostChange}
              />
            </Form.Group>
            <Button variant="primary" className="createButton" type="submit">
              Create Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}