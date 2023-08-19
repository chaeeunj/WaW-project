import { useState, useEffect } from 'react';
import { MoviesDataAtom } from '../recoil/MoviesDataAtom';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import Contents from '../components/Contents';
import Pagination from '../components/Pagination';

function Movies() {
  const [movies, setMovies] = useRecoilState(MoviesDataAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchDataForPage = async (currentPage) => {
    try {
      // 각 페이지에 맞는 API 주소 생성
      const apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=7a170163b1751c8516b4112e0a10f71d&language=ko-KR&region=krhttps://api.themoviedb.org/3/movie/popular?api_key=7a170163b1751c8516b4112e0a10f71d&language=ko-KR&region=kr&page=${currentPage}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      // 데이터를 처리하는 로직
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataForPage(currentPage);
  }, [currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>영화</PageTitle>
        <AllMovies>
          <MovieCard>
            {movies.map((movie) => (
              <Contents key={movie.id} data={movie} category={'movie'} />
            ))}
          </MovieCard>
        </AllMovies>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default Movies;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  position: relative;
  left: -560px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.point_blue};
`;

const AllMovies = styled.div`
  margin-top: 50px;
  margin-bottom: 15px;
`;

const MovieCard = styled.div`
  gap: 10px;
`;
