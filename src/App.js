import logo from './logo.svg';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Homework from "./Pages/Homework";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import Main from "./Pages/Main";

function App() {
  return (
      <div className="App">
        <Header></Header>

        <Routes>
          {/*<Route path="/주소창에쓸 경로" element={< 만든 컴포넌트 이름/>} />*/}
          <Route path="/homework" element={<Homework/>} />
          <Route path="/" element={<Main/>} />
        </Routes>
      </div>
  );
}

export default App;
