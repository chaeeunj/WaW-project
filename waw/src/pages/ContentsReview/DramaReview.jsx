import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { ReviewDataAtom } from '../../recoil/ReviewDataAtom';
import { DramaIdAtom } from '../../recoil/DramasDataAtom';
import { useRecoilValue } from 'recoil';
import { auth, db } from '../../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import DramaDetail from '../../components/ContentsDetail/DramaDetail';
import Review from '../../components/Review';
import Button from '../../components/Buttons/Button';

function DramaReview() {
  const [dramaReview, setDramaReview] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const reviewData = useRecoilValue(ReviewDataAtom);
  const dramaId = useRecoilValue(DramaIdAtom);

  const loadReviewData = async () => {
    const reviewData = await getDocs(collection(db, 'userReview'));
    const userData = reviewData.docs.map((doc) => doc.data());
    setUserReview(userData);
  };

  const onclickSaveButton = async () => {
    const userDataWithDramaId = {
      ...reviewData,
      dramaId: dramaId,
    };
    await addDoc(collection(db, 'userReview'), userDataWithDramaId);
    loadReviewData();
  };

  useEffect(() => {
    loadReviewData();
  }, []);

  useEffect(() => {
    const filteredReviews = userReview.filter(
      (review) => review.dramaId === dramaId
    );
    setDramaReview(filteredReviews);
  }, [userReview, dramaId]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <DramaDetail />
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
          <Review reviewHistory={dramaReview} />
        </ReviewWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default DramaReview;

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
