import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyPagination from "./MyPagination";

function MyCard() {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentRange, setCurrentRange] = useState(0);
    const totalPages = Math.ceil(images.length / itemsPerPage);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => console.error('Error loading the images:', error));
    }, []);

    const indexOfFirstImage = currentPage * itemsPerPage - itemsPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfFirstImage + itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);
    const handleRangeChange = (newRange) => {
        setCurrentRange(newRange);
        setCurrentPage(newRange + 1);
    };

    return (
        <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {currentImages.map(image => (
                    <Col key={image.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={image.url} />
                            <Card.Body>
                                <Card.Title>{image.id}</Card.Title>
                                <Card.Text>{image.title}</Card.Text>
                                <Button variant="primary" onClick={() => navigate('/')}>
                                    홈으로
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <MyPagination
                totalPages={totalPages}
                currentRange={currentRange}
                handlePageChange={handlePageChange}
                handleRangeChange={handleRangeChange}
            />
        </>
    );
}

export default MyCard;