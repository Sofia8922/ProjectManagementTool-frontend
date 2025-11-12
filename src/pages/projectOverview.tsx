// import account store

import { Card, Col, Row } from "react-bootstrap";
import NewProjectModal from "../Components/NewProjectModal";

const ProjectOverview = () => {

    return (
        <>
            <Card>
                <Row>
                <Col>
                {/* als de rol van ingelogd account OWNER is dan wordt knop geshowed */}
                {/* {Account.role === OWNER && <button>new project</button>} */}
                <NewProjectModal />
                </Col>
                <Col>
                <h2>
                    Project Overview page
                </h2>
                </Col>
                <Col>
                <h4>logged in as:</h4> {/* {Account.name} */}
                {/* set account store to null */}
                <button>logout</button>
                </Col>
                </Row>
            </Card>
            <Card>
            <div>
                <h4>Ongoing projects</h4>
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