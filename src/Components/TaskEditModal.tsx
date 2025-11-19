import { Button } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";
import { useUser } from "../stores/userStore";
import { type TaskEditDTO, type TaskDTO } from "../types/Task";

// taskData is de Task die meegegeven wordt

const TaskEditModal = (taskData : TaskDTO) => {

    const user = useUser();
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [taskEditData, setTaskEditData] = useState<TaskEditDTO>({name:'',content:'',status:taskData.status})
    const queryClient= useQueryClient();

    const updateTask = useMutation({
            mutationFn : async(taskEditData : TaskEditDTO) => {
                const response = await fetch(`${API_URL}/${user.id}/tasks/${taskData.id}`,
                    { method : 'PUT',
                      headers : { 'Content-Type' : 'application/json'},
                    body: JSON.stringify(taskEditData)
                    });
                    if (!response) throw new Error("Failed to connect to backend.")
                        else console.log("Task edit request succesfully sent.")
                    return response.json();
            },
            onSuccess: (response) => {
                if(response.name!==undefined) {
                    console.log(response)
                queryClient.invalidateQueries();
                setTaskEditData({...taskEditData, name: '', content:''})
                setShowEditTaskModal(false)                
             } else if (response.message!==undefined) {
                console.log(response.message)
              }
            },
            onError: () => {
                console.log("can't find backend")
            }
        })

    const handleSubmitEditTask = () => {
        updateTask.mutate(taskEditData)
        console.log("handled submit Edit Task")
    };

     const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTaskEditData({ ...taskEditData, [name]: value });
    }

    const openTaskEditModal = () => {
        setShowEditTaskModal(true)
        setTaskEditData({name:taskData.name,content:taskData.content,status:taskData.status})

    }

    return (
        <>
            <Button as="input" variant="primary" value={"Edit task"} onClick={() => openTaskEditModal()} />

            <CustomModal title="Edit Task" handleSubmit={handleSubmitEditTask} show={showEditTaskModal} setShow={setShowEditTaskModal} >
                <form>
                    <fieldset>
                        <div>
                            <label htmlFor="name"> Name: </label>
                            <input type="text" id="name" name="name" value={taskEditData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="content"> Description: </label>
                            <textarea id="content" name="content" value={taskEditData.content} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="status"> Role: </label>
                            <select id="status" name="status" value={taskEditData.status} onChange={handleChange}>
                                <option value="PENDING">Pending</option>
                                <option value="INPROGRESS">In Progress</option>
                                <option value="ONHOLD">On Hold</option>
                                <option value="UNDERREVIEW">Under Review</option>
                                <option value="COMPLETED">Developer</option>
                                <option value="SCRAPPED">Customer</option>
                            </select>
                        </div>
                    </fieldset>
                </form>
            </CustomModal>
        </>

    )

}
export default TaskEditModal