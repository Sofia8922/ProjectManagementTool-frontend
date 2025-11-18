import { Button } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { AccountCreationDTO, RoleEnums } from "../types/models";
import { useUser } from "../stores/userStore";

interface CreationData{
    name:string,
    email:string,
    role:RoleEnums,
    password:string
}



const CreateNewAccountModal = () => {

    const [showCreateNewAccountModal, setShowCreateNewAccountModal] = useState(false);
    const [formData, setFormData] = useState<CreationData>({ name: '', email: '', role: 'OWNER', password: ''})
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
            if (response.message!==undefined) {            
            setErrorMessage(response.message)
            } else {
            console.log(response)
            setFormData({ name: '', email: '', role: 'OWNER', password: ''})
            setErrorMessage('')
            setShowCreateNewAccountModal(false)
            }
        },
        onError: (response : any) => {
            console.log("Er ging iets fout.")
            if (response.message!==undefined) setErrorMessage(response.message)
        }
    })

    const handleSubmitCreateNewAccount = () => {
        if (formData.email.includes('@')) {
        console.log("handled submit create new account")
        createUser.mutate(formData)
        console.log(formData)
        } else { console.log("Email invalid!")}
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    }

    return (
        <p>
            <Button as="input" variant="primary" value={"Create new account"} onClick={() => setShowCreateNewAccountModal(true)} />

            <CustomModal title="Account Creation" handleSubmit={handleSubmitCreateNewAccount} show={showCreateNewAccountModal} setShow={setShowCreateNewAccountModal}>
                <form>
                    <fieldset>
                        <div>
                            {errorMessage && (<p style={{color:'red'}} className="error">{errorMessage}</p>)}
                            <label htmlFor="username"> Name: </label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email"> Email Address: </label>
                            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="role"> Role: </label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                <option value="OWNER">Owner</option>
                                <option value="DEVELOPER">Developer</option>
                                <option value="CUSTOMER">Customer</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password"> Password: </label>
                            <input type="text" id="password1" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                    </fieldset>
                </form>
            </CustomModal>
        </p>

    )

}
export default CreateNewAccountModal