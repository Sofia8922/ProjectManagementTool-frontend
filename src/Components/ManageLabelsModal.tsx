import { Button, Form } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";


const ManageLabelsModal = () => {

    const [showManageLabelsModal, setShowManageLabelsModal] = useState(false);

    const handlemanageLabelsModal = () => {
        console.log("handled submit Edit Project")
    };

    return (
        <>
            <hr></hr>
            New manage labels modal
            <Button as="input" variant="primary" value={"Manage labels"} onClick={() => setShowManageLabelsModal(true)} />

            <CustomModal title="hoi ik ben een modal" handleSubmit={handlemanageLabelsModal} show={showManageLabelsModal} setShow={setShowManageLabelsModal} >
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
export default ManageLabelsModal