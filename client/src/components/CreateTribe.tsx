import { Tribe } from '../api';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import "../App.css";


axios.defaults.withCredentials = true;

function CreateTribe() {
    
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const user = userContext.user;
    
    //Feel like we should remove this and just use the one in the api file?
    const [tribe, setTribe] = useState<Omit<Tribe, "id">>({
        owner: "",
        title: "",
        description: "",
        members: ["test"],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTribe(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {

        
        e.preventDefault();
        console.log("User:", user);
        try {
            if (!user) {
                console.error("User is not logged in");
                return;
            }
            tribe.owner = user.username;
            console.log("Creating tribe:", tribe);
          const response = await axios.post("http://localhost:8080/tribes", tribe);
          console.log("Tribe created:", response.data);
          navigate("/");
    
      } catch (error) {
          console.error("Error caught creating tribe:", error);
      }
      };
    

    return (
        <>
        <div className="sectionMargin flex text-center items-center fixed-top">
        <Link to = "/"className="goBack text-blue-500 margin">  Go back</Link>

 
        <div className="text-center">
          <h1 className="pageTitle">Create tribe </h1>
        </div>

        
        <section data-testid="form">
        <Form  className="form-container" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

          <Form.Label>Tribe Name</Form.Label>
          <Form.Control 
          type="title"
          name="title"
          placeholder="Tribe name" 
          value={tribe.title} 
          onChange={handleChange} 
           />
          <Form.Label>Tribe Description</Form.Label>
          <Form.Control 
          type="description" 
          name="description"
          placeholder="Tribe description"
          value={tribe.description}
          onChange={handleChange}
          />
        </Form.Group>

        <div className="d-grid gap-2 col-6">
        <button type="submit" className="btn btn-light tribeButton">Create Tribe</button>
        </div>
        </Form>
        
        </section>
        </div>
        </>
    
    )

};

export default CreateTribe;