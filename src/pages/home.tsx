import { Button } from "react-bootstrap";
import CustomModal from "../Components/CustomModal";
import { useState } from "react";
import { Form } from "react-bootstrap";

const Homepage = () => {

    const [show, setShow] = useState(false);
    const handleSubmit = () => {
        console.log("handled submit")
    };

    return (
        <>
            <h1>
                Homepage
                <br></br>
                <Button variant="primary" value={"show modal"} onClick={() => setShow(true)} />

                <CustomModal title="hoi ik ben een modal" handleSubmit={handleSubmit} show={show} setShow={setShow} >
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p>This is the first item.</p>
                    <p>This is the second item.</p>
                    <p>This is the third item.</p>
                </CustomModal>
            </h1>
        </>
    )
}

export default Homepage;