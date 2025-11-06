import { Button } from "react-bootstrap";
import CustomModal from "../Components/CustomModal";
import { useState } from "react";
import { Form } from "react-bootstrap";

const Homepage = () => {

    const [showNewAccountModal, setShowNewAccountModal] = useState(false);
    const handleSubmit = () => {
        console.log("handled submit")
    };

    return (
        <>
            <p>
                Homepage
                <br></br>
                <Button variant="primary" value={"Create new account"} onClick={() => setShowNewAccountModal(true)} />

                <CustomModal title="hoi ik ben een modal" handleSubmit={handleSubmit} show={showNewAccountModal} setShow={setShowNewAccountModal} >
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
                    </Form>
                </CustomModal>
            </p>
        </>
    )
}

export default Homepage;