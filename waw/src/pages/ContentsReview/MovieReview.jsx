import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { ReviewDataAtom } from '../../recoil/ReviewDataAtom';
import { MovieIdAtom } from '../../recoil/MoviesDataAtom';
import { useRecoilValue } from 'recoil';
import { auth, db } from '../../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import MovieDetail from '../../components/ContentsDetail/MovieDetail';
import Review from '../../components/Review';
import Button from '../../components/Buttons/Button';

function MovieReview() {
  const [movieReview, setMovieReview] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const reviewData = useRecoilValue(ReviewDataAtom);
  const movieId = useRecoilValue(MovieIdAtom);

  // let userReview = [];

  const loadReviewData = async () => {
    const reviewData = await getDocs(collection(db, 'userReview'));
    const userData = reviewData.docs.map((doc) => doc.data());
    setUserReview(userData);
  };

  const onclickSaveButton = async () => {
    const userDataWithMovieId = {
      ...reviewData,
      movieId: movieId,
    };
    await addDoc(collection(db, 'userReview'), userDataWithMovieId);
    loadReviewData();
  };

  useEffect(() => {
    loadReviewData();
  }, []);

  useEffect(() => {
    const filteredReviews = userReview.filter(
      (review) => review.movieId === movieId
    );
    setMovieReview(filteredReviews);
  }, [userReview, movieId]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MovieDetail />
        <ButtonWrapper>
          <Button
            name={'저장'}
            onClick={onclickSaveButton}
            fontSize={'16px'}
            padding={'10px 25px'}
            borderRadius={'7px'}
          />
        </ButtonWrapper>
        <ReviewWrapper>
          <Review reviewHistory={movieReview} />
        </ReviewWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default MovieReview;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 40px 0 0 730px;
`;

const ReviewWrapper = styled.div`
  margin-top: 60px;
`;
