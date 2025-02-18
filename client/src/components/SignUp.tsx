import { Form } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import axios from "axios";


function SignUp() {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users", formData);
      console.log("User created:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/home";

  } catch (error) {
      console.error("Error creating user:", error);
  }
  };

  return (
    <>
      <div className="d-grid gap-2 col-6 mx-auto">
        <h1 className="pageTitle">Sign up to VibeTribe </h1>
      </div>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

          <Form.Label>First Name</Form.Label>
          <Form.Control 
          type="text"
          name="name"
          placeholder="First Name" 
          value={formData.name} 
          onChange={handleChange} 
           />
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          name="email"
          placeholder="name@example.com" 
          value={formData.email}
          onChange={handleChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
          />
        </Form.Group>
        
      
        <div className="d-grid gap-2 col-6 mx-auto">
        <button type="submit" className="btn btn-light loginButton">Create Account</button>
        </div>
        </Form>

      <div className="d-grid gap-2 col-6 mx-auto loginBack" >
        <a href = "./account">
        <button type="button" className="btn btn-light loginButton" >Already have an accout</button>
        </a>
      </div>
      
    </>
  )
}

export default SignUp;