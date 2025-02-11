import { Form } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';

function Account() {
    return (
        <>
        <div className="d-grid gap-2 col-6 mx-auto">
            <h1>Log in to VibeTribe </h1>
        </div>   

    <Form className="form-container">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>

            <div className="d-grid gap-2 col-6 mx-auto">

            <button type="button" className="btn btn-light" style={{ width: "300px" }} >Log in</button>
            <p>Don't have an account?</p>  
            <button type="button" className="btn btn-light" style={{ width: "300px" }}>Sign up</button>
            </div>

        </>
    )
} 

export default Account;