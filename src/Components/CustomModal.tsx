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
                    <Button variant="secondary" onClick={()=>setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" value={"confirm"} onClick={() => { 
                                 handleSubmit()
                                 setShow(false)
                                 }} >
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal