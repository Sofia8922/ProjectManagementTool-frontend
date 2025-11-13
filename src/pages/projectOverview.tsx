// import account store
// import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';
import { Card, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import NewProjectModal from "../Components/NewProjectModal";
// import { Fragment } from "react/jsx-runtime";
// import InfiniteScroll from "../Components/InfiniteHorizontalScroll";
import ScrollLinked from "../Components/HorizontalScrollBar";
// import type { ProjectShortDTO } from "../Types/Project";
// import ProjectOverviewComponent from '../Components/ProjectOverviewComponent';

const ProjectOverview = () => {

    // const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } = useSmoothHorizontalScroll();

    const {
        data: account,
        isLoading,
        error
    } = useQuery({
        queryKey: ["account"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8080/accounts/1`);
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
                            <ScrollLinked data={account.madeProjects}>
                            </ScrollLinked>
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