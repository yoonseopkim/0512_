import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MyModal({ showModal, handleClose }) {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>로그인 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>패스워드를 확인해 주세요!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary">
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;
