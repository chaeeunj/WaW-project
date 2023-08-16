import { useEffect } from 'react';
import { MoviesDataAtom } from '../recoil/MoviesDataAtom';
import { useRecoilState } from 'recoil';
// import { Pagination } from '@mui/material';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import Contents from '../components/Contents';

function Movies() {
  const [movies, setMovies] = useRecoilState(MoviesDataAtom);

  useEffect(() => {
    console.log(movies);
  }, []);

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
        {/* <Pagination count={10} /> */}
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
`;

const MovieCard = styled.div`
  gap: 10px;
`;
