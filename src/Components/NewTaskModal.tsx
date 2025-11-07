import { Button, Form } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";


const NewTaskModal = () => {

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const handleSubmitNewTask = () => {
        console.log("handled submit Edit Project")
    };

    return (
        <>
            <hr></hr>
            New Task Modal
            <Button as="input" variant="primary" value={"New task"} onClick={() => setShowNewTaskModal(true)} />

            <CustomModal title="hoi ik ben een modal" handleSubmit={handleSubmitNewTask} show={showNewTaskModal} setShow={setShowNewTaskModal} >
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
        </>
    )

}
export default NewTaskModal