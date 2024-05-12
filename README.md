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
