import { Tribe } from '../api';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;

function CreateTribe() {
    
    const navigate = useNavigate();
    
    const [tribe, setTribe] = useState<Tribe>({
        id: 0,
        posts : [],
        owner: 2,
        title: "",
        description: "",
        members: [],
        createdAt: "",
        updatedAt: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTribe(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8080/tribes", tribe);
          console.log("Tribe created:", response.data);
          localStorage.setItem("tribe", JSON.stringify(response.data));
          navigate("/home");
    
      } catch (error) {
          console.error("Error creating tribe:", error);
      }
      };
    

    return (
        <>
        <div className="d-grid gap-2 col-6 mx-auto">

          <h1 className="pageTitle">Create tribe </h1>
        </div>

        <a href = "./home"> 
        <button type="submit" className="btn btn-light goBack"> Go back</button>
        </a>

        <Form className="form-container" onSubmit={handleSubmit}>
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
        </>
    
    )

};

export default CreateTribe;