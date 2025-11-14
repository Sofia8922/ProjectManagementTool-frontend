// import account store
import { Card, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import NewProjectModal from "../Components/NewProjectModal";
 import { Fragment } from "react/jsx-runtime";
import type { ProjectShortDTO } from "../types/Project";
import { API_URL } from "../App";
import { logout, useUser } from "../stores/userStore";
import { useNavigate } from "react-router";
import { updateProjectId, useProjectId } from "../stores/projectIdStore";
import ProgressCalculator from "../Components/ProgressCalculator";
import ScrollLinked from "../Components/HorizontalScrollBar";
// import InfiniteScroll from "../Components/InfiniteHorizontalScroll";
// import type { ProjectShortDTO } from "../Types/Project";
// import ProjectOverviewComponent from '../Components/ProjectOverviewComponent';

const ProjectOverview = () => {

const user = useUser();
    const projectId = useProjectId();
    const navigate = useNavigate();
    console.log("wat zit er in de store op Overview, id: " + user.id + ", name: " + user.name)    
    //add type to useQuery --> useQuerry<AccountDTO>
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

    console.log(account.madeProjects)

    // console.log(typeof( account.madeProjects ))

    // const accountArray = Object.entries(account.madeProjects)

    // console.log(typeof(accountArray))
    // const accountsArray2 = Object.entries(accountArray)

    // console.log(typeof(accountsArray2))
    //     let data: any = [1, 2, 3];
    // let numbers: number[] = data as number[];

    // const accountsArray : ProjectShortDTO[] = account.madeProjects as ProjectShortDTO[]

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
                            {/* <ScrollLinked data={account.madeProjects}> */}
                            {account.madeProjects.map((madeProject: ProjectShortDTO) =>
                                <Fragment key={madeProject.id}>
                                    <li onClick={() => updateProjectId(madeProject.id)
                                    }>
                                        <h5>{madeProject.name}</h5>
                                        <p>{madeProject.description}</p>
                                        <ProgressCalculator id={madeProject.id}/>
                                    </li>
                                </Fragment>
                            )}
                            {/* </ScrollLinked> */}
                        </>) : (<>No projects found</>)}
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