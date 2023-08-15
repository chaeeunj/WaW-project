import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { MoviesDataAtom } from '../recoil/MoviesDataAtom';
import { DramasDataAtom } from '../recoil/DramasDataAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import Phrases from '../components/Phrases';
import Contents from '../components/Contents';
import TextButton from '../components/Buttons/TextButton';

function Main() {
  const [movies, setMovies] = useRecoilState(MoviesDataAtom);
  const [dramas, setDramas] = useRecoilState(DramasDataAtom);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMoviesData();
    fetchDramasData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=7a170163b1751c8516b4112e0a10f71d&language=ko-KR&region=kr'
      );
      const jsonData = await response.json();
      setMovies(jsonData.results);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const fetchDramasData = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/tv/popular?api_key=7a170163b1751c8516b4112e0a10f71d&language=ko-KR&region=kr'
      );
      const jsonData = await response.json();
      const data = jsonData.results;
      const daramaData = data.filter((drama) => drama.genre_ids[0] === 18);
      setDramas(daramaData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  console.log(dramas);

  const onclickAllContentsButton = (page) => {
    navigate(page);
  };

  const popularMovies = movies.slice(0, 5);
  const popularDramas = dramas.slice(0, 5);
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PhrasesWrpper>
          <Phrases />
        </PhrasesWrpper>
        <AllContents>
          <TextButton
            name={'전체보기 >'}
            onClick={() => onclickAllContentsButton('/movie')}
            fontSize={'16px'}
          />
        </AllContents>
        <div>
          {popularMovies.map((movie) => (
            <Contents key={movie.id} data={movie} category={'movie'} />
          ))}
        </div>
        <AllContents>
          <TextButton
            name={'전체보기 >'}
            onClick={() => onclickAllContentsButton('/drama')}
            fontSize={'16px'}
          />
        </AllContents>
        <div>
          {popularDramas.map((drama) => (
            <Contents key={drama.id} data={drama} category={'drama'} />
          ))}
        </div>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Main;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PhrasesWrpper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  top: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.light_yellow};
`;

const AllContents = styled.div`
  margin-left: 935px;
  margin-top: 10px;
`;
