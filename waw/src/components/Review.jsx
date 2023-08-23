import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { ReviewDataAtom } from '../recoil/ReviewDataAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { auth, db } from '../services/firebase';
import PropTypes from 'prop-types';

function Review({ reviewHistory }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [review, setReview] = useState('');
  const [quote, setQuote] = useState('');
  const [reviewData, setReviewData] = useRecoilState(ReviewDataAtom);

  const user = auth.currentUser;

  const handleImgUploadClick = () => {
    const imgInput = document.getElementById('img-input');
    imgInput.click();
  };

  const handleImgInputChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);

    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      urls.push(imageUrl);
    }
    setImageUrls(urls);
  };

  useEffect(() => {
    setReviewData({
      uid: user.uid,
      review: review,
      scene: imageUrls,
      quote: quote,
    });
  }, [selectedFiles, imageUrls, review, quote]);

  // console.log(reviewData);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <ReviewWrapper>
          <Title>감상평</Title>
          <ReviewInput
            value={reviewHistory.review}
            onChange={(e) => setReview(e.target.value)}></ReviewInput>
        </ReviewWrapper>
        <SceneWrapper>
          <Title>기억하고 싶은 장면</Title>
          <ImgInput
            id="img-input"
            type="file"
            accept="image/*"
            required
            multiple
            onChange={handleImgInputChange}></ImgInput>
          <UploadWrapper>
            {imageUrls.map((imageUrl, index) => (
              <ImgUpload
                key={index}
                src={imageUrl}
                onClick={handleImgUploadClick}
              />
            ))}
          </UploadWrapper>
        </SceneWrapper>
        <QuoteWrapper>
          <Title>기억하고 싶은 대사</Title>
          <QuoteInput
            value={reviewHistory.quote}
            onChange={(e) => setQuote(e.target.value)}></QuoteInput>
        </QuoteWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

Review.propTypes = {
  reviewHistory: PropTypes.array.isRequired,
};

export default Review;

const Wrapper = styled.div``;

const ReviewWrapper = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.p`
  margin-bottom: 15px;
  font-size: 18px;
  color: ${({ theme }) => theme.main_text};
`;

const ReviewInput = styled.textarea`
  width: 800px;
  min-height: 400px;
  padding: 15px;
  border: none;
  outline: none;
  resize: none;
  border-radius: 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.main_text};
  background-color: ${({ theme }) => theme.light_yellow};
`;

const SceneWrapper = styled.div`
  margin-bottom: 40px;
`;

const ImgInput = styled.input`
  margin-bottom: 10px;
`;

const UploadWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const ImgUpload = styled.img`
  width: 400px;
  height: 280px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.light_yellow};
`;

const QuoteWrapper = styled.div`
  margin-bottom: 40px;
`;

const QuoteInput = styled.textarea`
  width: 800px;
  min-height: 200px;
  padding: 20px 10px 0 10px;
  border: none;
  outline: none;
  resize: none;
  border-radius: 15px;
  font-size: 16px;
  display: flex;
  color: ${({ theme }) => theme.main_text};
  background-color: ${({ theme }) => theme.light_yellow};
`;
