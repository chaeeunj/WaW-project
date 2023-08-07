import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" />
          <Route path="/login" />
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
