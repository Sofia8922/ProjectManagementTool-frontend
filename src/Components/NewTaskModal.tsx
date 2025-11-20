import { Button } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";
import { useUser } from "../stores/userStore";
import { useProjectId } from "../stores/projectIdStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { TaskCreateDTO } from "../types/Task";


const NewTaskModal = () => {
    const user = useUser();
    const projectId = useProjectId();
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', content: '', creatorId:user.id, projectId:projectId})    
    const [errorMessage, setErrorMessage] = useState('')
    const queryClient = useQueryClient()

    const createTask = useMutation({
        mutationFn: async (creationData:TaskCreateDTO) => {
            const response = await fetch(`${API_URL}/${user.id}/tasks`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(creationData)
                });
            if (!response) throw new Error("Failed to create task.")
            else console.log("Task creation request succesfully sent!")
            return response.json();
        },
        onSuccess: (response) => {
            if (response.message!==undefined) {
                setErrorMessage(response.message)
            } else {
            console.log(response)
            setFormData({ name: '', content: '', creatorId:user.id, projectId:projectId})
            queryClient.invalidateQueries({queryKey: ['task']})
            setShowNewProjectModal(false)
            }
        },
        onError: () => {
            console.log("Something went wrong")
        }
    })

    const handleSubmitNewProject = () => {
        
        console.log("handled submit create new task")
        createTask.mutate(formData)
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
                <Button as="input" variant="primary" value={"new task"} onClick={() => setShowNewProjectModal(true)} />

                <CustomModal title="Task Creation Form" handleSubmit={handleSubmitNewProject} show={showNewProjectModal} setShow={setShowNewProjectModal} >
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
                            <label htmlFor="content"> Content: </label>
                            <input type="text" id="content" name="content" value={formData.content} onChange={handleChange} />
                        </div>
                    </fieldset>
                </form>
                </CustomModal>
            </p>
        </>
    )
}
export default NewTaskModal