import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset';

import NavigationBar from './components/NavigationBar';
import Start from './pages/Start';
import Login from './pages/Login';
import Join from './pages/Join';
import Main from './pages/Main';
import Search from './pages/Search/Search';
import SearchResults from './pages/Search/SearchResults';
import Movies from './pages/ContentsList/Movies';
import Dramas from './pages/ContentsList/Dramas';
import MovieReview from './pages/ContentsReview/MovieReview';
import DramaReview from './pages/ContentsReview/DramaReview';
import MyPage from './pages/MyPage';
import UserInfoUpdate from './pages/UserInfoUpdate';
import MyMovie from './pages/LikedContents/MyMovie';
import MyDrama from './pages/LikedContents/MyDrama';

import Test from './pages/Test';

function App() {
  return (
    <>
      <Reset />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/main" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/results" element={<SearchResults />} />
          <Route path="/drama" element={<Dramas />} />
          <Route path="/drama/:id" element={<DramaReview />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieReview />} />
          <Route path="/mydrama" element={<MyDrama />} />
          <Route path="/mymovie" element={<MyMovie />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/userinfo" element={<UserInfoUpdate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
