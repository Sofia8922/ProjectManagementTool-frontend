import { Button } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";
import { useUser } from "../stores/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { ProjectCreateDTO } from "../types/Project";


const NewProjectModal = () => {
    const user = useUser();
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '', creatorId:user.id})    
    const [errorMessage, setErrorMessage] = useState('')
    const queryClient = useQueryClient()

    const createProject = useMutation({
        mutationFn: async (creationData:ProjectCreateDTO) => {
            const response = await fetch(`${API_URL}/${user.id}/projects`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(creationData)
                });
            if (!response) throw new Error("Failed to create account.")
            else console.log("Project creation request succesfully sent!")
            return response.json();
        },
        onSuccess: (response) => {
            if (response.message!==undefined) {
                setErrorMessage(response.message)
            } else {
            console.log(response)
            setFormData({ name: '', description: '', creatorId:user.id})
            queryClient.invalidateQueries({queryKey: ["account"]})
            setShowNewProjectModal(false)
            }
        },
        onError: () => {
            console.log("Er ging iets fout.")
        }
    })

    const handleSubmitNewProject = () => {
        
        console.log("handled submit create new project")
        createProject.mutate(formData)
        console.log(formData)
        console.log("Email invalid!")
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    }

    return (
        <>
            <p>
                <Button as="input" variant="primary" value={"new project"} onClick={() => setShowNewProjectModal(true)} />

                <CustomModal title="Project Creation Form" handleSubmit={handleSubmitNewProject} show={showNewProjectModal} setShow={setShowNewProjectModal} >
                    <form>
                    <fieldset>
                        <div>
                            {errorMessage && (<p style={{color:'red'}} className="error">{errorMessage}</p>)}
                        </div>
                        <div>
                            <label htmlFor="name"> Project Name: </label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="description"> Description: </label>
                            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                    </fieldset>
                </form>
                </CustomModal>
            </p>
        </>
    )

}
export default NewProjectModal