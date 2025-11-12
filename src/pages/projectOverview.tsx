// import account store

import { Card, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import NewProjectModal from "../Components/NewProjectModal";
import { Fragment } from "react/jsx-runtime";
import type { ProjectShortDTO } from "../types/Project";
import { useState } from "react";
import { API_URL } from "../App";
import { useUser } from "../stores/userStore";

const ProjectOverview = () => {

    const [projectId, setProjectId] = useState<number>(NaN);
    const user = useUser();
    console.log(user.name)
        ; const {
            data: account,
            isLoading,
            error
        } = useQuery({
            queryKey: ["account"],
            queryFn: async () => {
                const response = await fetch(`${API_URL}/accounts/1`);
                if (!response.ok) {
                    throw new Error("account error")
                }
                return response.json();
            },
        })

    if (isLoading) {
        return <p>loading</p>
    }
    if (error) {
        return <p>error</p>
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
                        {/* set account store to null */}
                        <button>logout</button>
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
                                    <li onClick={() => setProjectId(madeProject.id)}>
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