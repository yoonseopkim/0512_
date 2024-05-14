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

    // post,put 요청
    const handleAddImage = () => {
        const newImage = {
            albumId: 1,
            title: 'new image',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOmElXyiza80_wqmLFJWBDvllrzP6dvqzumQ&usqp=CAU',
            thumbnailUrl: 'https://via.placeholder.com/150/92c952'
        };
        axios.post('https://jsonplaceholder.typicode.com/photos', newImage)
            .then(response => {
                console.log('POST 요청 응답:', response);
                console.log('상태 코드:', response.status);
                console.log('추가된 이미지:', response.data);
                // 배열의 첫 번째 위치에 새 이미지 추가
                setImages(prevImages => [response.data, ...prevImages]);  // 상태 업데이트
            })
            .catch(error => console.error('Error adding image:', error));
    };

    // put
    const handleUpdateImage = (id) => {
        const updatedImage = {
            id: id,
            albumId: 1,
            title: 'updated image',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKpWNOBJroqvo4CQqJX07z3xXoYVpXtUliaQ&usqp=CAU',
            thumbnailUrl: 'https://via.placeholder.com/150/92c952'
        };
        axios.put(`https://jsonplaceholder.typicode.com/photos/${id}`, updatedImage)
            .then(response => {
                console.log('PUT 요청 응답:', response);
                console.log('상태 코드:', response.status);
                console.log('업데이트된 이미지:', response.data);
                setImages(images.map(image => image.id === id ? response.data : image));  // 상태 업데이트
            })
            .catch(error => console.error('Error updating image:', error));
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
                                <Button onClick={handleAddImage} variant="success">게시물 추가</Button>
                                <Button onClick={() => handleUpdateImage(image.id)} variant="warning">이미지 수정</Button>
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
