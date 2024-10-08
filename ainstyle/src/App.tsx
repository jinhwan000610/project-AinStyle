import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NoticePage from './pages/NoticePage';
import BoardPage from './pages/BoardPage';
import Myp from './pages/Myp';
import FunctionPage from './pages/FunctionPage';
import MyHeartPage from './pages/MyHeartPage';
import MyClothePage from './pages/MyClothePage';
import MyInfo from './pages/MyInfo';
import SelectButton from './pages/SelectButton';
import Crawler from './pages/Crawler';
import Result from './pages/Result';
import ShareForm from './pages/ShareForm';
import PostDetail from './pages/PostDetail'; // PostDetail 컴포넌트를 import 합니다.
import { StyleProvider } from './context/StyleContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <StyleProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path="/board" element={<BoardPage />} />
              <Route path="/mypage" element={<Myp />} />
              <Route path="/ai-style" element={<FunctionPage />} />
              <Route path="/selectbutton" element={<SelectButton />} />
              <Route path="/myheartpage" element={<MyHeartPage />} />
              <Route path="/myclothepage" element={<MyClothePage />} />
              <Route path="/myinfo" element={<MyInfo />} />
              <Route path="/stylecrawlerpage" element={<Crawler />} />
              <Route path="/result" element={<Result />} />
              <Route path="/share" element={<ShareForm />} />
              <Route path="/post/:id" element={<PostDetail />} /> {/* PostDetail 경로를 추가합니다. */}
            </Routes>
          </div>
        </StyleProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
