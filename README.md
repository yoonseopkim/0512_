웹스톰 (인텔리제이와 같은 ide에 전부 적용가능)에서 git 버전 관리시 .idea 폴더까지 업로드 되는 문제

```jsx
<Button variant="info" onClick={() => navigate(`/image/${image.id}`)}>
상세페이지 이동
</Button>
```

예시코드 참고용
```jsx
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

```

나머지 post와 put 요청
```jsx
const handleAddImage = () => {
    const newImage = {
        albumId: 1,
        title: 'new image',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952'
    };
    axios.post('https://jsonplaceholder.typicode.com/photos', newImage)
        .then(response => {
            console.log('추가된 이미지:', response.data);
            setImages([...images, response.data]);  // 상태 업데이트
        })
        .catch(error => console.error('Error adding image:', error));
};

```

```jsx
const handleUpdateImage = (id) => {
    const updatedImage = {
        id: id,
        albumId: 1,
        title: 'updated image',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952'
    };
    axios.put(`https://jsonplaceholder.typicode.com/photos/${id}`, updatedImage)
        .then(response => {
            console.log('업데이트된 이미지:', response.data);
            setImages(images.map(image => image.id === id ? response.data : image));  // 상태 업데이트
        })
        .catch(error => console.error('Error updating image:', error));
};

```

```jsx
<Row className="mb-3">
    <Col>
        <Button onClick={handleAddImage} variant="success">이미지 추가</Button>
    </Col>
    {currentImages.map(image => (
        <Col key={image.id}>
            <Button onClick={() => handleUpdateImage(image.id)} variant="warning">이미지 수정</Button>
        </Col>
    ))}
</Row>

```
