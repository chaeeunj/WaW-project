import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoviesDataAtom } from '../../recoil/MoviesDataAtom';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { auth, db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

import Pagination from '../../components/Pagination';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function MyMovie() {
  const user = auth.currentUser;
  const [movies, setMovies] = useRecoilState(MoviesDataAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = movies.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getLikedMovies = async () => {
    try {
      const userLikedMovie = await getDocs(collection(db, 'userLikedMovie'));
      const likedMovie = userLikedMovie.docs.map((doc) => doc.data());
      setMovies(likedMovie);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getLikedMovies();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>다시 보고싶은 영화</PageTitle>
        <MovieContainer>
          <CardWrapper>
            {user &&
              moviesToShow.map(
                (movie) =>
                  user.uid === movie.userId && (
                    <ContentsCard to={`/movie/${movie.id}`} key={movie.movieId}>
                      <Img
                        src={API_IMG + movie.poster_path}
                        alt={movie.title}
                      />
                      <Title>{movie.title}</Title>
                    </ContentsCard>
                  )
              )}
          </CardWrapper>
        </MovieContainer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default MyMovie;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  position: relative;
  left: -470px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.point_blue};
`;

const MovieContainer = styled.div`
  margin: 30px 0;
  width: 1175px;
  height: 100%;
`;

const CardWrapper = styled.div`
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContentsCard = styled(Link)`
  margin: 15px;
  text-decoration: none;
`;

const Img = styled.img`
  width: 175px;
  height: 240px;
`;

const Title = styled.h1`
  width: 175px;
  color: ${({ theme }) => theme.contents_title};
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
