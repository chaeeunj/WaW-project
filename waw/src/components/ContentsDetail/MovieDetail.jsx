import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoviesDataAtom } from '../../recoil/MoviesDataAtom';
import { useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import PropTypes from 'prop-types';
import { Heart, HeartFill } from 'react-bootstrap-icons';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function MovieDetail({ onClick, active }) {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const movies = useRecoilValue(MoviesDataAtom);

  useEffect(() => {
    setMovie(movies.find((movie) => movie.id === parseInt(id)));
  }, [movie]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Poster src={API_IMG + movie.poster_path} alt={movie.title} />
        {/* <HeartIcon onClick={onClick} />
        <HeartFillIcon onClick={onClick} /> */}
        {active ? (
          <HeartFillIcon onClick={onClick} />
        ) : (
          <HeartIcon onClick={onClick} />
        )}
        <Movie>
          <Title>{movie.title}</Title>
          <MovieInfo>
            <Category>
              <Key>카테고리</Key>
              <Value>영화</Value>
            </Category>
            <OverView>
              <Key>줄거리</Key>
              <Value>{movie.overview}</Value>
            </OverView>
            <ReleaseDate>
              <Key>개봉일</Key>
              <Value>{movie.release_date}</Value>
            </ReleaseDate>
          </MovieInfo>
        </Movie>
      </Wrapper>
    </ThemeProvider>
  );
}

MovieDetail.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

export default MovieDetail;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Poster = styled.img`
  width: 240px;
  height: 320px;
`;

const HeartIcon = styled(Heart)`
  color: red;
  position: relative;
  bottom: 145px;
  left: 40px;
  cursor: pointer;
`;

const HeartFillIcon = styled(HeartFill)`
  color: red;
  position: relative;
  bottom: 145px;
  left: 40px;
`;

const Movie = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.main_text};
`;

const MovieInfo = styled.div``;

const Category = styled.div`
  display: flex;
  margin-top: 20px;
`;

const OverView = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ReleaseDate = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Key = styled.p`
  width: 80px;
  margin-right: 25px;
`;

const Value = styled.p`
  width: 450px;
  color: ${({ theme }) => theme.main_text};
`;
