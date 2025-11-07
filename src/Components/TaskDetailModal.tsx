import { Button, Form } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";
import TaskEditModal from "./TaskEditModal";


const TaskDetailModal = () => {

    const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
    const handleSubmitTaskDetailModal = () => {
        console.log("handled submit")
    };

    return (
        <>
            <hr></hr>
            task detail modal

            
            <Button as="input" variant="primary" value={"task detail"} onClick={() => setShowTaskDetailModal(true)} />
            <CustomModal title="hoi ik ben een modal" handleSubmit={handleSubmitTaskDetailModal} show={showTaskDetailModal} setShow={setShowTaskDetailModal} >
                <TaskEditModal/>
                
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

export default TaskDetailModal