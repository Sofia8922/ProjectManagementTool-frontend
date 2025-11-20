import { Button, Card, Col, Form, Row } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown';
import CustomModal from "./CustomModal"
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProjectEditDTO } from "../types/Project";
import { API_URL } from "../App";
import { useUser } from "../stores/userStore";
import type { AccountNameDTO, AccountShortDTO } from "../types/Account";


const EditProjectModal = ({ project }) => {

    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    // const [scrappedStatus, setScrappedStatus] = useState(false);
    const user = useUser();
    const [formData, setFormData] = useState({ name: '', description: '', scrappedStatus: false, developers: new Array<AccountNameDTO>(), customers: new Array<AccountNameDTO>() })
    const [errorMessage, setErrorMessage] = useState('')
    const [newDevelopers, setNewDevelopers] = useState<AccountNameDTO[]>([]);
    const [oldDevelopers, setOldDevelopers] = useState<AccountNameDTO[]>([]);
    const [newCustomers, setNewCustomers] = useState<AccountNameDTO[]>([]);
    const [oldCustomers, setOldCustomers] = useState<AccountNameDTO[]>([]);
    const [ scrappedStatus, setScrappedStatus] = useState(false);
    // const [listAlt, setListAlt] = useState<Foo[]>([]);

    const queryClient = useQueryClient()
    let nextId = 0;
    let oldNextId = 0;
    let nextCustomerId = 0;
    let oldNextCustomerId = 0;

    const editProject = useMutation({
        mutationFn: async (editData: ProjectEditDTO) => {
            const response = await fetch(`${API_URL}/${user.id}/projects`,
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
            if (response.message !== undefined) {
                setErrorMessage(response.message)
            } else {
                console.log(response)
                setFormData({ name: '', description: '', scrappedStatus: false, developers: new Array<AccountNameDTO>(), customers: new Array<AccountNameDTO>() })
                queryClient.invalidateQueries({ queryKey: ['account'] })
                setShowEditProjectModal(false)
            }
        },
        onError: () => {
            console.log("Something went wrong.")
        }
    })


    // const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    //     console.log(formData)
    // }

    const handleSubmitEditProject = (event) => {
        event.preventDefault();
    const obj = formData;
    const data = new FormData(event.target);
        // Loop through FormData entries
    for (const [key, value] of data.entries()) {
        // If the key is 'pages', convert the value to a number
        if (key === 'scrappedStatus') {
            obj[key] = scrappedStatus;
        }
        // If the key is 'developers', make the value the array of developers
        else if (key === 'developers') {
            obj[key] = newDevelopers;
        }
        else if (key === 'customers') {
            obj[key] = newCustomers;
        }        // For all other fields, store the value as is
        else {
            obj[key] = value;
        }
    }
        console.log("handled submit Edit Project")
        editProject(formData)
    }

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
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
        console.log(formData)
    }

    const developerAccounts = accounts.filter(item =>
        item.role === 'DEVELOPER');

    const customerAccounts = accounts.filter(item =>
        item.role === 'CUSTOMER');

    const addDeveloper = (developerName) => {
        console.log("adding developer")
        console.log(newDevelopers)
        setNewDevelopers([
            ...newDevelopers,
            { id: nextId++, name: developerName }
        ]);
    }

    const removeDeveloper = (developerName) => {
        console.log("removing developer")
        console.log(oldDevelopers)
        setOldDevelopers([
            ...oldDevelopers,
            { id: oldNextId++, name: developerName }
        ]);
    }

        const addCustomer = (customerName) => {
        console.log("adding customer")
        setNewCustomers([
            ...newCustomers,
            { id: nextCustomerId++, name: customerName }
        ]);
    }

    const removeCustomer = (customerName) => {
        console.log("removing customer")
        setOldCustomers([
            ...oldCustomers,
            { id: oldNextCustomerId++, name: customerName }
        ]);
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

            <CustomModal title={project.name} handleSubmit={handleSubmitEditProject} show={showEditProjectModal} setShow={setShowEditProjectModal}>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Project name</Form.Label>
                                <Form.Control type="email" placeholder={project.name} defaultValue={project.name} onChange={handleChangeBootstrap} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="projectScrapped" onChange={changeScrappedStatus} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Project description</Form.Label>
                        <Form.Control type="text" as="textarea" rows={3} placeholder={project.description} defaultValue={project.description} onChange={handleChangeBootstrap}/>
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
                                                <Dropdown.Item as="button" type="button" key={developer.id} onClick={() => addDeveloper(developer.name)}> {developer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <br />

                                    <br />
                                    <h6>Developers to be added to the team</h6>
                                    <div>{newDevelopers.map(developer => (
                                        <div>{developer.name}</div>
                                    ))}</div>
                                    <br />


                                    <h6>Current developers</h6>
                                    <Dropdown className="remove developers" autoClose="outside">
                                        <Dropdown.Toggle id="remove developers">
                                            remove developers
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {project.developers.map(developer =>(
                                                <Dropdown.Item as="button" type="button" key={developer.id} onClick={() => removeDeveloper(developer.name)}>{developer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    
                                    <br />
                                    <h6>Developers to be removed from the team</h6>
                                    <div>{oldDevelopers.map(developer => (
                                        <div>{developer.name}</div>
                                    ))}</div>
                                    <br />
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
                                                <Dropdown.Item as="button" type="button" key={customer.id} onClick={() => addCustomer(customer.name)}> {customer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <br />

                                    <br />
                                    <h6>Customers to be added to the team</h6>
                                    <div>{newCustomers.map(customer => (
                                        <div>{customer.name}</div>
                                    ))}</div>
                                    <br />


                                    <h6>Current customers</h6>
                                    <Dropdown className="remove customers" autoClose="outside">
                                        <Dropdown.Toggle id="remove customers">
                                            remove customers
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {project.customers.map(customer =>(
                                                <Dropdown.Item as="button" type="button" key={customer.id} onClick={() => removeCustomer(customer.name)}>{customer.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    
                                    <br />
                                    <h6>Customers to be removed from the team</h6>
                                    <div>{oldCustomers.map(customer => (
                                        <div>{customer.name}</div>
                                    ))}</div>
                                    <br />
                                </Col>
                            </Card>
                        </Row>
                    </Card>
                </Form>
            </CustomModal >
        </>

    )

}
export default EditProjectModal


// {project.developers.map(developer => (
//     <li key={developer.id}>
//         {developer.name}
//     </li>
// ))}