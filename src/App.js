import './App.css';
import {Route, Routes} from "react-router-dom";
import Homework from "./Pages/Homework";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import Main from "./Pages/Main";
import ImageDetail from "./Components/ImageDetail";
function App() {
  return (
      <div className="App">
        <Header></Header>

        <Routes>
          {/*<Route path="/주소창에쓸 경로" element={< 만든 컴포넌트 이름/>} />*/}
          <Route path="/homework" element={<Homework/>} />
          <Route path="/" element={<Main/>} />
            <Route path="/image/:id" element={<ImageDetail />} />  // 이미지 상세 페이지 라우트 추가
        </Routes>
      </div>
  );
}

export default App;
