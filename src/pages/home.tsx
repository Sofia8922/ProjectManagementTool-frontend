import CreateNewAccountModal from "../Components/CreateNewAccountModal";
import LoginFormComponent from "../Components/LoginFormComponent";

const Homepage = () => {

    return (
        <>
            <p>
                Homepage
                <br></br>
                <LoginFormComponent/>
                <br></br>
                <CreateNewAccountModal/>
            </p>
        </>
    )
}

export default Homepage;