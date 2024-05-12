import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ImageDetail() {
    const { id } = useParams(); // URL에서 이미지 ID 추출
    const [image, setImage] = React.useState(null);

    React.useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then(response => {
                setImage(response.data);
            })
            .catch(error => console.error('Error loading the image:', error));
    }, [id]);

    if (!image) return <div>Loading...</div>; //로딩중 표시할 메세지

    return (
        <div>
            <h1>{image.id}번 게시물의 이미지 입니다.</h1>
            <img src={image.url} alt={image.title} />
            <h4>{image.id}번 게시물의 제목:{image.title} 내용 ~~</h4>
        </div>
    );
}

export default ImageDetail;
