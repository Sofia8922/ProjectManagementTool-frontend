// import account store

import NewProjectModal from "../Components/NewProjectModal";

const ProjectOverview = () => {
    
    return (
        <>
            <div>
                {/* als de rol van ingelogd account OWNER is dan wordt knop geshowed */}
                {/* {Account.role === OWNER && <button>new project</button>} */}
                <NewProjectModal/>
                <h1>
                    Project Overview page
                </h1>
                <h4>logged in as:</h4> {/* {Account.name} */}
                {/* set account store to null */}
                <button>logout</button>
            </div>
            <div>
                <h4>Ongoing projects</h4>
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