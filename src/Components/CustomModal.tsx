import { Children } from "react";
import { Button, Modal } from "react-bootstrap"

interface modalProps {
    title: string;
    children: React.ReactNode;
    handleSubmit: () => void;
    show: boolean;
    setShow: (arg0: boolean) => void;
}

const CustomModal = ({ title, children, handleSubmit, show , setShow }: modalProps) => {

    return (
        <>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                style={{ width: "100%"}}
            >
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="RowList">
                    {Children.map(children, child =>
                        <div className="Row">
                            {child}
                        </div>
                    )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button as="input" variant="secondary" value="Return" onClick={()=>setShow(false)}>
                        
                    </Button>
                    <Button as="input" variant="primary" value="Confirm" onClick={() => { 
                                 handleSubmit()
                                 // setShow(false) Patrick: Do not hide automatically, wait until there's no errors
                                 }} />
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default CustomModal