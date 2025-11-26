import { Button, Form, type FormControlProps } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState, type ChangeEvent, type ChangeEventHandler } from "react";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { AccountCreationDTO, RoleEnums } from "../types/models";
import { useUser } from "../stores/userStore";

interface CreationData {
    name: string,
    email: string,
    role: RoleEnums,
    password: string
}



const CreateNewAccountModal = () => {

    const [showCreateNewAccountModal, setShowCreateNewAccountModal] = useState(false);
    const [formData, setFormData] = useState<CreationData>({ name: '', email: '', role: 'OWNER', password: '' })
    const [errorMessage, setErrorMessage] = useState('')
    const user = useUser();

    const createUser = useMutation({
        mutationFn: async (creationData: AccountCreationDTO) => {
            const response = await fetch(`${API_URL}/${user.id}/accounts`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(creationData)
                });
            if (!response) throw new Error("Failed to create account.")
            else console.log("User creation request succesfully sent!")
            return response.json();
        },
        onSuccess: (response) => {
            if (response.message !== undefined) {
                setErrorMessage(response.message)
            } else {
                console.log(response)
                setFormData({ name: '', email: '', role: 'OWNER', password: '' })
                // invalidate queries here later
                setShowCreateNewAccountModal(false)
            }
        },
        onError: () => {
            console.log("Something went wrong.")
        }
    })

    const handleSubmitCreateNewAccount = () => {
        if (formData.email.includes('@')) {
            console.log("handled submit create new account")
            createUser.mutate(formData)
            console.log(formData)
        } else { setErrorMessage("Email address invalid!") }
    };
    
    // idk what kind of event Bootstrap throws at me, so that's why it has an any type
    const handleChangeBootstrap = (event: any) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData({ ...formData, [fieldName]: fieldValue })
        console.log(formData)
    }

    return (
        <p>
            <Button as="input" variant="primary" value={"Create new account"} onClick={() => setShowCreateNewAccountModal(true)} />

            <CustomModal title="Account Creation" handleSubmit={handleSubmitCreateNewAccount} show={showCreateNewAccountModal} setShow={setShowCreateNewAccountModal}>
                <Form>
                    <>
                        <div>
                            {errorMessage && (<p style={{ color: 'red' }} className="error">{errorMessage}</p>)}
                            <Form.Group className="username" controlId="FormUsername">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control name="name" type="text" placeholder="" onChange={handleChangeBootstrap} />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group className="email" controlId="FormEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="text" placeholder="" onChange={handleChangeBootstrap} />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Select className="role" name="role" value={formData.role} onChange={handleChangeBootstrap}>
                                <option value="OWNER">Owner</option>
                                <option value="DEVELOPER">Developer</option>
                                <option value="CUSTOMER">Customer</option>
                            </Form.Select>
                        </div>
                        <div>
                            <Form.Group className="password" controlId="FormPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name="password" type="text" placeholder="" onChange={handleChangeBootstrap} />
                            </Form.Group>
                        </div>
                    </>
                </Form>
            </CustomModal>
        </p>

    )

}
export default CreateNewAccountModal