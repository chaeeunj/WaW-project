import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset';

import NavigationBar from './components/NavigationBar';
import Login from './pages/login';
import Test from './pages/Test';

function App() {
  return (
    <>
      <Reset />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="test" element={<Test />} />
          <Route path="/" />
          <Route path="/login" element={<Login />} />
          <Route path="/join" />
          <Route path="/main" />
          <Route path="/search" />
          <Route path="/search/results" />
          <Route path="/drama" />
          <Route path="/drama/:id" />
          <Route path="/movie" />
          <Route path="/movie/:id" />
          <Route path="/mydrama" />
          <Route path="/mymovie" />
          <Route path="/liked" />
          <Route path="/mypage" />
          <Route path="/mypage/userinfo" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
