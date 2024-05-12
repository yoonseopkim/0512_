import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row, InputGroup } from "react-bootstrap";
import MyModal from './MyModal';  // MyModal 컴포넌트를 import

function MyForm() {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <Form>
                        <InputGroup>
                            <Form.Label htmlFor="inputPassword5" visuallyHidden>
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                placeholder="Password"
                            />
                            <Button variant="success" onClick={handleOpenModal}>로그인</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <MyModal showModal={showModal} handleClose={handleCloseModal} />
        </>
    );
}

export default MyForm;
