import { Button, Card, Col, Form, Row } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown';
import CustomModal from "./CustomModal"
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProjectEditDTO } from "../types/Project";
import { API_URL } from "../App";
import { useUser } from "../stores/userStore";
import type {  AccountShortDTO } from "../types/Account";


const EditProjectModal = ({ project }) => {

    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    const user = useUser();
    const [formData, setFormData] = useState({ name: project.name, description: project.description, scrappedStatus: false, projectDevelopers: project.projectDevelopers, projectCustomers: project.projectCustomers })
    const [errorMessage, setErrorMessage] = useState('')
    const [newCustomers, setNewCustomers] = useState<AccountShortDTO[]>([]);
    const [oldCustomers, setOldCustomers] = useState<AccountShortDTO[]>([]);
    const [ scrappedStatus, setScrappedStatus] = useState(false);

    const queryClient = useQueryClient()

    const editProject = useMutation({
        mutationFn: async (editData: ProjectEditDTO) => {
            const response = await fetch(`${API_URL}/${user.id}/projects/${project.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editData)
                });
            if (!response) throw new Error("Failed to edit project.")
            else console.log("Project edit request succesfully sent!")
            return response.json();
        },
        onSuccess: (response) => {
            console.log(JSON.stringify(formData))
            if (response.message !== undefined) {
                setErrorMessage(response.message)
                console.log(errorMessage)
                console.log(response.message)
            } else {
                console.log(response)
                setFormData({ name: project.name, description: project.description, scrappedStatus: false, projectDevelopers: new Array<AccountShortDTO>(), projectCustomers: new Array<AccountShortDTO>() })
                queryClient.invalidateQueries({ queryKey: ['project'] })
                setShowEditProjectModal(false)
            }
        },
        onError: () => {
            console.log("Something went wrong.")
        }
    })

    const handleSubmitEditProject = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        console.log("handled submit Edit Project")
        
        await setFormData({
            ...formData, 
            scrappedStatus: scrappedStatus, projectDevelopers: project.projectDevelopers, projectCustomers: project.projectCustomers
    })

        console.log(formData)
        // console.log(useProjectId)
        console.log(project.id)
        console.log(user.id)
        editProject.mutate(formData)
    }

        console.log("formdata")
        console.log(formData)
        console.log("project Developers")
        console.log(formData.projectDevelopers)
        
    const {
        data: accounts,
        isLoading: isAccountLoading,
        error: accountError
    } = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/${user.id}/accounts`);
            if (!response.ok) {
                throw new Error("accounts error")
            }
            return response.json();
        },
    })

    if (isAccountLoading) {
        return <p>accounts loading</p>
    }
    if (accountError) {
        return <p>account error</p>
    }

    // patricks handle change methode
    const handleChangeBootstrap = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target)
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
        // console.log(formData)
    }


    //filters op basis van ID
    const idsAddDevs = formData.projectDevelopers.map(item=> item.id)

    const idsAddClient = project.projectCustomers.map(item=> item.id)
    const moreIdsAddClient = newCustomers.map(item=> item.id)
    const idsRemoveClient = oldCustomers.map(item=> item.id)

    //alle developers in de app
    let developerAccounts = accounts.filter(item =>
        item.role === 'DEVELOPER' && !idsAddDevs.includes(item.id) 
    )

    // alle developers in het project
    let projectDeveloperAccounts = formData.projectDevelopers

    // alle customers in de app
    const customerAccounts = accounts.filter(item =>
        item.role === 'CUSTOMER' && !idsAddClient.includes(item.id) && !moreIdsAddClient.includes(item.id)
    )

    // alle customers in het project
    const projectCustomerAccounts = project.projectCustomers.filter(item =>
        item.role === "CUSTOMER" && !idsRemoveClient.includes(item.id)
    )
    

    const addDeveloper = (developer) => {
        console.log("adding developer")
        const devs = [...formData.projectDevelopers, developer];
        setFormData({
            ...formData, 
            projectDevelopers: devs
    })
    projectDeveloperAccounts = [...projectDeveloperAccounts, newDevelopers ]
    }

    const removeDeveloper = (developer) => {
        console.log("removing developer")
        const devs = formData.projectDevelopers.filter(item => item.id !== developer.id)
        setFormData({
            ...formData, 
            projectDevelopers: devs
    })
    developerAccounts = [... developerAccounts, developer]
    }




        const addCustomer = (customer) => {
        console.log("adding customer")
        setNewCustomers([
            ...newCustomers,
            { id: customer.id, name: customer.name, email: customer.email, role:customer.role }
        ]);
    }

    const removeCustomer = (customer) => {
        console.log("removing customer")
        setOldCustomers([
            ...oldCustomers,
            { id: customer.id, name: customer.name, email: customer.email, role:customer.role }
        ]);
    }

    const removeNewDev = (developer) => {
        developerAccounts.push(developer)
        setNewDevelopers(newDevs => newDevs.filter(dev => dev.id !== developer.id))
    }

    const removeNewClient = (customer) => {
        customerAccounts.push(customer)
        setNewCustomers(newClients => newClients.filter(client => client.id !== customer.id))
    }

    const resetRemovedDev = (developer) => {
        projectDeveloperAccounts.push(developer)
        setOldDevelopers(oldDevs => oldDevs.filter(oldDev => oldDev.id !== developer.id))
    }

    const resetRemovedClient = (customer) => {
        projectCustomerAccounts.push(customer)
        setOldCustomers(oldClients => oldClients.filter(oldClient => oldClient.id !== customer.id))
    }

    const changeScrappedStatus = ()=>{
        if (scrappedStatus == false){setScrappedStatus(true)}
        else {setScrappedStatus(false)}
    }

    // checks returnen yes als ze aangevinkt zijn en niets als ze niet aangevinkt zijn dus daar moet ik nog ff mee dealen met bv een ternary
    // https://stackoverflow.com/questions/77319339/return-boolean-value-from-checkbox-on-html-form
    // deze site laat zien hoe je door de formdata heen loopt en dit soort dingen met if statements aan kunt passen naar de juiste waardes
    // er staan 2 voorbeelden op de site maar de eerste vind ik het duidelijkst en ik denk dat ik toch nog door de form data heen moet loopen om de data op te schonen voor de devs en clients

    return (
        <>
            <Button as="input" variant="primary" value={"Edit project"} onClick={() => setShowEditProjectModal(true)} />

            <CustomModal title={project.name} handleSubmit={()=>handleSubmitEditProject} show={showEditProjectModal} setShow={setShowEditProjectModal}>
                <Form onSubmit={handleSubmitEditProject}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Project name</Form.Label>
                                <Form.Control name="name" type="text" placeholder={project.name} defaultValue={project.name} onChange={handleChangeBootstrap} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check name="scrappedStatus" type="checkbox" label="projectScrapped" onChange={changeScrappedStatus} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Project description</Form.Label>
                        <Form.Control name="description" type="text" as="textarea" rows={3} placeholder={project.description} defaultValue={project.description} onChange={handleChangeBootstrap}/>
                    </Form.Group>

                    <Card>
                        <Row>
                            <Card style={{ width: "50%" }}>
                                <Col>
                                    <h6>Add developers</h6>
                                    <Dropdown className="d-inline mx-2" autoClose="outside">
                                        <Dropdown.Toggle id="add developers">
                                            add developers
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {developerAccounts.map(developer => (
                                                <Dropdown.Item as="button" type="button" key={developer.id} onClick={() => addDeveloper(developer)}> {developer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <br />

                                    <br />
                                    <h6>Project developers:</h6>
                                    <div>
                                        <br/>
                                        {projectDeveloperAccounts.map(developer=>(
                                            <input key={developer.id} type="button" onClick={()=> removeDeveloper(developer)} value={developer.name} ></input>
                                        ))}
                                    </div>


                                    {/* <h6>Remove developers</h6>
                                    <Dropdown className="remove developers" autoClose="outside">
                                        <Dropdown.Toggle id="remove developers">
                                            remove developers
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {projectDeveloperAccounts.map(developer =>(
                                                <Dropdown.Item as="button" type="button" key={developer.id} onClick={() => removeDeveloper(developer)}>{developer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    
                                    <br />
                                    <h6>Developers to be removed from the team</h6>
                                    <div>{oldDevelopers.map(developer => (
                                        <input key={developer.id} type="button" onClick={()=> resetRemovedDev(developer)} value={developer.name}></input>
                                    ))}</div>
                                    <br /> */}
                                </Col>
                            </Card>



                            
                            <Card style={{ width: "50%" }}>
                                <Col>
                                    <h6>Add customers</h6>
                                    <Dropdown className="d-inline mx-2" autoClose="outside">
                                        <Dropdown.Toggle id="add customers">
                                            add customers
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {customerAccounts.map(customer => (
                                                <Dropdown.Item as="button" type="button" key={customer.id} onClick={() => addCustomer(customer)}> {customer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <br />

                                    <br />
                                    <h6>Customers to be added to the team</h6>
                                    <div>{newCustomers.map(customer => (
                                        <input key={customer.id} type="button" onClick={()=> removeNewClient(customer)} value={customer.name}></input>
                                    ))}</div>
                                    <br />

                                    <h6>Remove customers</h6>
                                    <Dropdown className="remove customers" autoClose="outside">
                                        <Dropdown.Toggle id="remove customers">
                                            Remove customers
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {projectCustomerAccounts.map(customer =>(
                                                <Dropdown.Item as="button" type="button" key={customer.id} onClick={() => removeCustomer(customer)}>{customer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    
                                    <br />
                                    <h6>Customers to be removed from the team</h6>
                                    <div>{oldCustomers.map(customer => (
                                        <input key={customer.id} type="button" onClick={()=>resetRemovedClient(customer)} value={customer.name}></input>
                                    ))}</div>



                                    <br />
                                </Col>
                            </Card>
                        </Row>
                    </Card>
                    <Button type="submit" variant="primary" value="Confirm"
                    //  onClick={() => { 
                    //              handleSubmitEditProject()
                    //             //  setShow(false) //Patrick: Do not hide automatically, wait until there's no errors
                    //             }} 
                    />
                </Form>
            </CustomModal >
        </>
    )
}
export default EditProjectModal