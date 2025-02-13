import { Form } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate();
    
    return (
        <>
        <div className="d-grid gap-2 col-6 mx-auto">
            <h1 className="pageTitle">Sign up to VibeTribe </h1>
        </div>   

    <Form className="form-container">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" />
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>

            <div className="d-grid gap-2 col-6 mx-auto">
            <button type="button" className="btn btn-light loginButton" >Create Account</button>
            </div>
            
            <div className = "d-grid gap-2 col-6 mx-auto loginBack" >
            <button type="button" className="btn btn-light loginButton" onClick={()=> navigate("/account")} >Already have an accout</button>
            </div>

        </>
    )
}

export default SignUp;