import { Card, Col, Container, Row } from "react-bootstrap";
import EditProjectModal from "../Components/EditProjectModal";
import ManageLabelsModal from "../Components/ManageLabelsModal";
import NewTaskModal from "../Components/NewTaskModal";
import TaskDetailModal from "../Components/TaskDetailModal";

const ProjectDetail = () => {
    // get projectById

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Col>
                            <button>project overview</button>
                        </Col>
                        <Col>
                            <h1>Project Detail page</h1>
                        </Col>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <div>
                            <h2>project title</h2>
                            {/* project.name */}
                            <h2>Tasks completed</h2>
                            {/* project.progress */}
                            <EditProjectModal />
                            <h3>project description</h3>
                            {/* project.description */}
                        </div>
                    </Card>
                    <div>
                        <Card>
                            <h2>Tasks</h2>

                            <Card>
                                <Card>
                                    <h3>ongoing tasks</h3>
                                    {/* {map project.tasks if status==ongoing} + onclick setTaskId*/}
                                    {/* task.name + task.content task.assignedDeveloper task.tags */}
                                    <TaskDetailModal />
                                </Card>
                                <Card>
                                        <Row className="justify-content-flex-row">
                                            <NewTaskModal />
                                            <ManageLabelsModal />
                                        </Row>
                                </Card>
                            </Card>
                            <Card>
                                <h3>completed tasks</h3>
                                {/* {map project.tasks if status==completed} + onclick setTaskId*/}
                                {/* task.name + task.content task.assignedDeveloper task.tags */}
                                <TaskDetailModal />
                            </Card>
                            <Card>
                                <h3>scrapped tasks</h3>
                                {/* {map project.tasks if status==scrapped} + onclick setTaskId*/}
                                {/* task.name + task.content task.assignedDeveloper task.tags */}
                                <TaskDetailModal />
                            </Card>
                        </Card>
                    </div>
                </Col>
                <Col>
                    <Card>
                        <div>
                            <h4>logged in as:</h4> {/* {Account.name} */}
                            {/* set account store to null */}
                            <button>logout</button>
                            <h4>project owner</h4>

                            <div>
                                <h4>dev team</h4>
                                {/* {map project.accounts if role==DEVELOPER */}
                            </div>
                            <div>
                                <h4>customers</h4>
                                {/* {map project.accounts if role==CUSTOMER */}
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProjectDetail;