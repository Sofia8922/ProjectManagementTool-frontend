import { Button, Card, Col, Row } from "react-bootstrap"
import CustomModal from "./CustomModal"
import { Fragment, useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import { useUser } from "../stores/userStore";
import { useNavigate } from "react-router";
import type { TaskDTO } from "../types/Task";
import type { AccountDTO } from "../types/Account";


const TaskDetailModal = () => {

    const user = useUser();
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
    const handleSubmitTaskDetailModal = () => {
        console.log("handled submit")
    };

    const deleteTask = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/${user.id}/tasks/1`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            if (!response.ok) throw new Error('failed to delete task');
            return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task'] });
            console.log("succes")
            setShowTaskDetailModal(false)
        }
    });

    const {
        data: account,
        isLoading: isAccountLoading,
        error: accountError
    } = useQuery<AccountDTO>({
        queryKey: ["account"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/${user.id}/accounts/${user.id}`);
            if (!response.ok) {
                throw new Error("account error")
            }
            return response.json();
        },
    })

    const {
        data: task,
        isLoading: isTaskLoading,
        error: taskError
    } = useQuery<TaskDTO>({
        queryKey: ["task"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/${user.id}/tasks/1`);
            if (!response.ok) {
                throw new Error("task error")
            }
            return response.json();
        },
    })

    if (isAccountLoading) {
        return <p>account loading</p>
    }
    if (accountError) {
        if (user.name === "" && Number.isNaN(user.id)) {
            navigate("/");
        }
        return <p>account error</p>
    }

    if (isTaskLoading) {
        return <p>task loading</p>
    }
    if (taskError) {
        if (user.name === "" && Number.isNaN(user.id)) {
            navigate("/");
        }
        return <p>task error</p>
    }
    if (task !== undefined && account !== undefined) {
        return (
            <>
                <Button as="input" variant="primary" value={"task detail"} onClick={() => setShowTaskDetailModal(true)} />
                <CustomModal title="Task details" handleSubmit={handleSubmitTaskDetailModal} show={showTaskDetailModal} setShow={setShowTaskDetailModal} >
                    <Card>
                        <Col>
                            <Row>
                                {task.name} made by: {task.creator.name}
                            </Row>
                        </Col>
                        <Col>
                            {task.content}
                        </Col>
                    </Card>
                    <Card>
                        {task.status} {task.tags.map((tag) => (
                            <Fragment key={tag.id}>
                                <li>
                                    <h5>{tag.name}</h5>
                                    <p>{tag.colour}</p>
                                </li>
                            </Fragment>
                        ))}
                    </Card>
                    <Card>
                        <Row>
                            <TaskEditModal /> {account.role !== "CUSTOMER" && <button onClick={() => deleteTask.mutate()}>Delete task</button>}
                        </Row>
                    </Card>
                    <Card>
                        comments
                        {task.comments.map((comment) => (
                            <Fragment key={comment.id}>
                                <li>
                                    <h5>{comment.id}</h5>
                                    <p>{comment.content}</p>
                                </li>
                            </Fragment>
                        ))}
                    </Card>
                </CustomModal>
            </>
        )
    }
}

export default TaskDetailModal