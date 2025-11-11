// import account store

import { useQuery } from "@tanstack/react-query";
import NewProjectModal from "../Components/NewProjectModal";
import { Fragment } from "react/jsx-runtime";

const ProjectOverview = () => {

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

    console.log(account)

    return (
        <>
            <div>
                {account.role === "OWNER" && <NewProjectModal />}
                {console.log(account.madeProjects.id + " hallo")}
                <h1>
                    Project Overview page
                </h1>
                <h4>logged in as:</h4> {account.name}
                {/* set account store to null */}
                <button>logout</button>
            </div>
            <div>
                <h4>Ongoing projects</h4>
                
                {account.madeProjects && account.madeProjects.length > 0 ? (
                    <>
                        {account.madeProjects.map((madeProject) =>
                            <Fragment key={madeProject.id}>
                                <li>
                                    <h5>{madeProject.name}</h5>
                                    <p>{madeProject.description}</p>
                                </li>
                            </Fragment>
                        )}
                    </>) : (<>No projects found</>)}

                {/* {map Account.projects if status==ongoing} + onclick setProjectId*/}
                {/* acount.projects.name + account.projects.description account.projects.progress */}
            </div>
            <div>
                <h4>Finished projects</h4>
                {/* {map Account.projects if status==finished} */}
                {/* acount.projects.name + account.projects.description account.projects.progress */}
            </div>
            <div>
                <h4>Scrapped projects</h4>
                {/* {map Account.projects if status==scrapped} */}
                {/* acount.projects.name + account.projects.description account.projects.progress */}
            </div>
        </>
    );
};

export default ProjectOverview;