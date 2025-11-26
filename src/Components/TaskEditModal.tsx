import { Button, Card, Dropdown, Form } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";
import { useUser } from "../stores/userStore";
import { type TaskEditDTO, type TaskDTO } from "../types/Task";
import { type ProjectDTO } from "../types/Project";
import { type AccountShortDTO } from "../types/Account";

// taskData is de Task die meegegeven wordt

interface TaskEditModalProps {
    taskData: TaskDTO
}

const TaskEditModal = ({ taskData }: TaskEditModalProps) => {

    const user = useUser();
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [taskEditData, setTaskEditData] = useState<TaskEditDTO>({ name: taskData.name, content: taskData.content, status: taskData.status, assignedDevelopers: taskData.assignedDevelopers })
    const [projectData, setProjectData] = useState<ProjectDTO>()
    const queryClient = useQueryClient();

    const updateTask = useMutation({
        mutationFn: async (taskEditData: TaskEditDTO) => {
            console.log("Sending the following data: ",taskEditData)
            const response = await fetch(`${API_URL}/${user.id}/tasks/${taskData.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskEditData)
                });
            if (!response) throw new Error("Failed to connect to backend.")
            else console.log("Task edit request succesfully sent.")
            return response.json();
        },
        onSuccess: (response) => {
            if (response.name !== undefined) {
                console.log(response)
                queryClient.invalidateQueries({ queryKey: ["task"] })
                queryClient.invalidateQueries({ queryKey: ["project"] })
                queryClient.invalidateQueries({ queryKey: ["account"]})
                setShowEditTaskModal(false)
            } else if (response.message !== undefined) {
                console.log(response.message)
            }
        },
        onError: () => {
            console.log("Something went wrong.")
        }
    })

    const {
            data: fetchedProjectData,
            isLoading: isProjectLoading,
            error: accountError
        } = useQuery({
            queryKey: ["project"],
            queryFn: async () => {
                const response = await fetch(`${API_URL}/${user.id}/projects/${taskData.project.id}`);
                if (!response.ok) {
                    throw new Error("accounts error")
                }
                return response.json();
            },
            onSuccess(fetchedProjectData) {
                if (fetchedProjectData!==undefined) {
                setProjectData(fetchedProjectData)
                console.log("fetched projectdata = ",fetchedProjectData)
                } else console.log("failed project fetch in TaskEdit")
            }
        })
    
        if (isProjectLoading) {
            return <p>project loading</p>
        }
        if (accountError) {
            return <p>project error</p>
        }

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
    }


    // idk what kind of event Bootstrap throws at me, so that's why it has an any type
    const handleChangeBootstrap = (event: any) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setTaskEditData({ ...taskEditData, [fieldName]: fieldValue })
        console.log(taskEditData)
    }

    const addDeveloper = (developer) => {
        console.log("adding developer ", developer)
        const devs = [...taskEditData.assignedDevelopers, developer];
        console.log(devs)
        setTaskEditData({
            ...taskEditData, 
            assignedDevelopers: devs
    })
    console.log(taskEditData.assignedDevelopers)
    //projectDeveloperAccounts = [...projectDeveloperAccounts, newDevelopers ]
    }

    const removeDeveloper = (developer) => {
        console.log("removing developer ", developer )
        const devs = taskEditData.assignedDevelopers.filter(item => item.id !== developer.id)
        setTaskEditData({
            ...taskEditData, 
            assignedDevelopers: devs
    })
    console.log(taskEditData.assignedDevelopers)
    //developerAccounts = [... developerAccounts, developer]
    }


    return (
        <>
            <Button as="input" variant="primary" value={"Edit task"} onClick={() => openTaskEditModal()} />

            <CustomModal title="Edit Task" handleSubmit={handleSubmitEditTask} show={showEditTaskModal} setShow={setShowEditTaskModal} >
                <Form>
                    <fieldset>
                        <div>
                            {/* <label htmlFor="name"> Name: </label>
                            <input type="text" id="name" name="name" value={taskEditData.name} onChange={handleChange} /> */}
                            <Form.Group className="name" controlId="FormUsername">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control name="name" type="text" placeholder="" onChange={handleChangeBootstrap} />
                            </Form.Group>
                        </div>
                        <div>
                            <label htmlFor="content"> Description: </label>
                            <textarea id="content" name="content" value={taskEditData.content} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="status"> status: </label>
                            <select id="status" name="status" value={taskEditData.status} onChange={handleChange}>
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="ON_HOLD">On Hold</option>
                                <option value="UNDER_REVIEW">Under Review</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="SCRAPPED">Scrapped</option>
                            </select>
                        </div>
                        <div>
                            <Card>
                            <h6>Add new developers</h6>
                            <Dropdown className="addDevelopers" autoClose="outside">
                                <Dropdown.Toggle id="addDevelopers">
                                    Add devs..
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {projectData !==undefined && projectData.projectDevelopers.map(developer => (
                                        <Dropdown.Item as="button" type="button" key={developer.id} onClick={() => addDeveloper(developer)}>{developer.name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <br />
                            <h6>Developers on the team</h6>
                            <div>{taskEditData.assignedDevelopers.map(developer => (
                                <input key={developer.id} type="button" onClick={() => removeDeveloper(developer)} value={developer.name}></input>
                            ))}</div>
                            </Card>
                            <br />
                        </div>
                    </fieldset>
                </Form>
            </CustomModal>
        </>

    )
}
export default TaskEditModal