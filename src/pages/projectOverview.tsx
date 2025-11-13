import { Card, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import NewProjectModal from "../Components/NewProjectModal";
import { Fragment } from "react/jsx-runtime";
import type { ProjectShortDTO } from "../types/Project";
import { API_URL } from "../App";
import { logout, useUser } from "../stores/userStore";
import { useNavigate } from "react-router";
import { updateProjectId, useProjectId } from "../stores/projectIdStore";

const ProjectOverview = () => {

    const user = useUser();
    const projectId = useProjectId();
    const navigate = useNavigate();
    console.log("wat zit er in de store op Overview, id: " + user.id + ", name: " + user.name)    
    const {
        data: account,
        isLoading: isAccountLoading,
        error: accountError
    } = useQuery({
        queryKey: ["account"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/accounts/${user.id}`);
            if (!response.ok) {
                throw new Error("account error")
            }
            return response.json();
        },
    })

    // const {
    //     data: projects,
    //     isLoading,
    //     error

    // } = useQuery({
    //     queryKey: ["projects"],
    //     queryFn: async () => {
    //         const response = await fetch(`${API_URL}/projects/accounts/1`);
    //         if (!response.ok) {
    //             throw new Error("projects error")
    //         }
    //         return response.json();
    //     },
    // })
    // projects.map((project: ProjectDTO) => {
    //     let completed = 0;
    //     let notCompleted = 0;
    //     console.log("completed: " + completed + "not completed: " + notCompleted)

    //     project.tasks.forEach(task => {
    //         if (task.status === "COMPLETED") {
    //             completed += 1;
    //         } else {
    //             notCompleted += 1;
    //         }
    //     })

    // }) 

    // if (isLoading) {
    //     return <p>loading</p>
    // }
    // if (error) {
    //     return <p>error</p>
    // }

    if (isAccountLoading) {
        return <p>account loading</p>
    }
    if (accountError) {
        return <p>account error</p>
    }
    if (projectId) {
        navigate("/projectDetails");
    }
    console.log(projectId)

    return (
        <>
            <Card>
                <Col>
                    {/* als de rol van ingelogd account OWNER is dan wordt knop geshowed */}
                    {account.role === "OWNER" && <NewProjectModal />}
                </Col>
                <Col>
                    <h2>
                        Project Overview page
                    </h2>
                    <Col>
                        <h4>logged in as:</h4> {account.name}
                        <button onClick={() => logout()}>logout</button>
                    </Col>
                </Col>
            </Card>
            <Card>
                <div>
                    <h4>Ongoing projects</h4>
                    {account.madeProjects && account.madeProjects.length > 0 ? (
                        <>
                            {account.madeProjects.map((madeProject: ProjectShortDTO) =>
                                <Fragment key={madeProject.id}>
                                    <li onClick={() => updateProjectId(madeProject.id)
                                    }>
                                        <h5>{madeProject.name}</h5>
                                        <p>{madeProject.description}</p>
                                    </li>
                                </Fragment>
                            )}
                        </>) : (<>No projects found</>)}
                    {/* {map Account.projects if status==ongoing} + onclick setProjectId*/}
                    {/* acount.projects.name + account.projects.description account.projects.progress */}
                </div>
            </Card>
            <Card>
                <div>
                    <h4>Finished projects</h4>
                    {/* {map Account.projects if status==finished} */}
                    {/* acount.projects.name + account.projects.description account.projects.progress */}
                </div>
            </Card>
            <Card>
                <div>
                    <h4>Scrapped projects</h4>
                    {/* {map Account.projects if status==scrapped} */}
                    {/* acount.projects.name + account.projects.description account.projects.progress */}
                </div>
            </Card>
        </>
    );
};

export default ProjectOverview;