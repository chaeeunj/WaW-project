import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { ReviewDataAtom } from '../../recoil/ReviewDataAtom';
import { useRecoilValue } from 'recoil';
import { auth, db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

import MovieDetail from '../../components/ContentsDetail/MovieDetail';
import Review from '../../components/Review';
import Button from '../../components/Buttons/Button';

function MovieReview() {
  const reviewData = useRecoilValue(ReviewDataAtom);

  const onclickSaveButton = async () => {
    await addDoc(collection(db, 'userReview'), reviewData);
  };

  useEffect(() => {}, [reviewData]);

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
          <Review />
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
