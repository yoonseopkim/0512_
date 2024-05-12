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

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then((response) => {
                // 서버에서 삭제 후, 로컬 상태 업데이트
                console.log('삭제 요청:', response);  // 응답 로깅
                setImages(images.filter(image => image.id !== id));
            })
            .catch(error => console.error('Error deleting the image:', error));
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
                                {/* 삭제 버튼으로 수정 */}
                                <Button variant="danger" onClick={() => handleDelete(image.id)}>
                                    삭제
                                </Button>
                                {/* 상세페이지 이동 버튼 추가 */}
                                <Button variant="info" onClick={() => navigate(`/image/${image.id}`)}>
                                    상세페이지 이동
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