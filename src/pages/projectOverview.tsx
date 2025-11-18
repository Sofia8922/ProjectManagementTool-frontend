import { Card, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import NewProjectModal from "../Components/NewProjectModal";
import type { ProjectShortDTO } from "../types/Project";
import { API_URL } from "../App";
import { logout, useUser } from "../stores/userStore";
import { useNavigate } from "react-router";
import { updateProjectId, useProjectId } from "../stores/projectIdStore";
import ProgressCalculator from "../Components/ProgressCalculator";
import { Fragment } from "react/jsx-runtime";
import ScrollLinkedProjects from "../Components/HorizontalScrollBarProjects";

const ProjectOverview = () => {

    //const [projectId, setProjectId] = useState<number>(NaN);
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
            const response = await fetch(`${API_URL}/${user.id}/accounts/${user.id}`);
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
                            <ScrollLinkedProjects data={account.madeProjects.filter(project => project.scrappedStatus === false)}>
                            </ScrollLinkedProjects>
                        </>) : (<>No projects found</>)}
                </div>
            </Card>
            <Card>
                <div>
                    <h4>Finished projects</h4>
                    {account.madeProjects && account.madeProjects.length > 0 ? (
                        <>
                            <ScrollLinkedProjects data={account.madeProjects.filter(project => project.scrappedStatus === false)}>
                            </ScrollLinkedProjects>
                        </>) : (<>No projects found</>)}
                    {/* {map Account.projects if status==finished} */}
                    {/* acount.projects.name + account.projects.description account.projects.progress */}
                </div>
            </Card>
            <Card>
                <div>
                    <h4>Scrapped projects</h4>
                    {account.madeProjects && account.madeProjects.length > 0 ? (
                        <>
                            <ScrollLinkedProjects data={account.madeProjects.filter(project => project.scrappedStatus === true)}>
                            </ScrollLinkedProjects>
                        </>) : (<>No projects found</>)}
                    {/* {map Account.projects if status==scrapped} */}
                    {/* acount.projects.name + account.projects.description account.projects.progress */}
                </div>
            </Card>
        </>
    );
};

export default ProjectOverview;