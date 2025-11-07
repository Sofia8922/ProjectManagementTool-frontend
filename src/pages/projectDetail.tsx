import EditProjectModal from "../Components/EditProjectModal";
import ManageLabelsModal from "../Components/ManageLabelsModal";
import NewTaskModal from "../Components/NewTaskModal";
import TaskDetailModal from "../Components/TaskDetailModal";

const ProjectDetail = () => {

    return (
        <p>
            <h1>Project Detail page</h1>
            <br></br>

            <EditProjectModal/>
            <NewTaskModal/>
            <ManageLabelsModal/>
            <TaskDetailModal/>



        </p>
    )
}

export default ProjectDetail;