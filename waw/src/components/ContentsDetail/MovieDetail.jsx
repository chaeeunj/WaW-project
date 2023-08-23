import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesDataAtom, MovieIdAtom } from '../../recoil/MoviesDataAtom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { auth, db } from '../../services/firebase';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function MovieDetail() {
  const user = auth.currentUser;
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [liked, setLiked] = useState(false);
  const movies = useRecoilValue(MoviesDataAtom);
  const setMovieId = useSetRecoilState(MovieIdAtom);

  const handleLikedIcon = async () => {
    setLiked(!liked);
  };

  useEffect(() => {
    setMovie(movies.find((movie) => movie.id === parseInt(id)));
    setMovieId(id);

    if (liked) {
      const userLikedMovie = {
        userId: user.uid,
        movieId: id,
        movieName: movie.title,
        moviePoster: movie.poster_path,
      };
      addDoc(collection(db, 'userLikedMovie'), userLikedMovie);
    } else {
      deleteDoc(doc(db, 'userLikedMovie', 'doc.id'));
    }
  }, [liked, user.uid, movie]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MovieWrapper>
          <Poster src={API_IMG + movie.poster_path} alt={movie.title} />
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
        </MovieWrapper>
        <HeartWrapper>
          <StyledP>이 영화를 또 보고 싶으신가요?</StyledP>
          {liked ? (
            <HeartIcon
              src="/full-heart.png"
              onClick={handleLikedIcon}></HeartIcon>
          ) : (
            <HeartIcon src="/heart.png" onClick={handleLikedIcon}></HeartIcon>
          )}
        </HeartWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default MovieDetail;

const Wrapper = styled.div``;

const MovieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Poster = styled.img`
  width: 240px;
  height: 320px;
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

const HeartWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledP = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.main_text};
`;
const HeartIcon = styled.img`
  width: 22px;
  height: 22px;
`;
