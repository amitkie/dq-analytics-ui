import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonComponent from "../../common/button/button";
 

function ModalComponent(ModalHeading,ModalContent,SecondaryBtnName,PrimaryBtnName,onClose,onConfirm) {
  // const [show, setShow] = useState(true);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>

      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>{ModalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ModalContent}</Modal.Body>
        <Modal.Footer>
        <ButtonComponent
            btnClass={"btn-secondary px-4"}
            btnName={SecondaryBtnName}
            onClick={onClose}
          />
          <ButtonComponent
            btnClass={"btn-danger px-4"}
            btnName={PrimaryBtnName}
            onClick={onConfirm}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;