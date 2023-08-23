import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DramasDataAtom } from '../../recoil/DramasDataAtom';
import { useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { auth, db } from '../../services/firebase';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function DramaDetail() {
  const user = auth.currentUser;
  const { id } = useParams();
  const [drama, setDrama] = useState([]);
  const [liked, setLiked] = useState(false);
  const dramas = useRecoilValue(DramasDataAtom);

  const handleLikedIcon = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    setDrama(dramas.find((drama) => drama.id === parseInt(id)));

    if (liked) {
      const userLikedDrama = {
        userId: user.uid,
        dramaId: id,
        dramaName: drama.name,
        dramaPoster: drama.poster_path,
      };
      addDoc(collection(db, 'userLikedDrama'), userLikedDrama);
    } else {
      deleteDoc(doc(db, 'userLikedDrama', 'doc.id'));
    }
  }, [liked, user.uid, drama]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <DramaWrapper>
          <Poster src={API_IMG + drama.poster_path} alt={drama.name} />
          <Drama>
            <Title>{drama.name}</Title>
            <DramaInfo>
              <Category>
                <Key>카테고리</Key>
                <Value>드라마</Value>
              </Category>
              <OverView>
                <Key>줄거리</Key>
                <Value>{drama.overview}</Value>
              </OverView>
              <ReleaseDate>
                <Key>첫 방영일</Key>
                <Value>{drama.first_air_date}</Value>
              </ReleaseDate>
            </DramaInfo>
          </Drama>
        </DramaWrapper>
        <HeartWrapper>
          <StyledP>이 드라마를 또 보고 싶으신가요?</StyledP>
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

export default DramaDetail;

const Wrapper = styled.div``;

const DramaWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

const Poster = styled.img`
  width: 240px;
  height: 320px;
`;

const Drama = styled.div`
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

const DramaInfo = styled.div``;

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
