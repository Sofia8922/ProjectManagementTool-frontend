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
import type { CommentCreateDTO } from "../types/Comment";
import { useProjectId } from "../stores/projectIdStore";

interface TaskDetailModalProps {
    taskId: number;
}

const TaskDetailModal = ({taskId}: TaskDetailModalProps) => {

    const user = useUser();
    const projectId = useProjectId();
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const [commentData, setCommentData] = useState<CommentCreateDTO>({content: "", authorId: user.id, taskId: taskId})
    const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
    const handleSubmitTaskDetailModal = () => {
        console.log("handled submit")
    };
    console.log("taskId:" + taskId)

    const deleteTask = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/${user.id}/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            if (!response.ok) throw new Error('failed to delete task');
            return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task"] });
            console.log("succesfully deleted task")
            setShowTaskDetailModal(false)
        }
    });

    const deleteComment = useMutation({
        mutationFn: async (deleteId: number) => {
            const response = await fetch(`${API_URL}/${user.id}/comments/${deleteId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            if (!response.ok) throw new Error('failed to delete comment');
            return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comment"] });
            console.log("succesfully deleted task")
            setShowTaskDetailModal(false)
        }
    }); 

    const createComment = useMutation({
        mutationFn: async (commentCreateData: CommentCreateDTO) => {
            const response = await fetch(`${API_URL}/${user.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentCreateData)
            })
            if (!response.ok) throw new Error('failed to place comment');
            return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["task", taskId]});
            queryClient.invalidateQueries({queryKey: ["project", projectId]})
            setCommentData({content: "", authorId: user.id, taskId: taskId})
            console.log("comment placed")
        }
    })

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
        queryKey: ["task", taskId],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/${user.id}/tasks/${taskId}`);
            if (!response.ok) {
                throw new Error("task error")
            }
            return response.json();
        },
    })

         const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCommentData({ ...commentData, [name]: value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        createComment.mutate(commentData)
        console.log("comment mutation submitted")
    }

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
                            <TaskEditModal taskData={task}/>
                            {account.role !== "CUSTOMER" && <button onClick={() => deleteTask.mutate()}>Delete task</button>}    
                        </Row>
                    </Card>
                    <Card>
                        comments
                        <form onSubmit={handleSubmit}>
                        <textarea id="content" name="content" value={commentData.content} onChange={handleChange} />
                        <button className="placeComment" type="submit">Place comment</button>
                        </form>
                        {task.comments.map((comment) => (
                            <Fragment key={comment.id}>
                                <li>
                                    <p>{comment.author.name}</p>
                                    <p>{comment.content}</p>
                                    {user.id === comment.author.id && <button onClick={() => deleteComment.mutate(comment.id)}>Delete comment</button>}
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