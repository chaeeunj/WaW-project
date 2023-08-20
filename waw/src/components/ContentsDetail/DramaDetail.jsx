import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DramasDataAtom } from '../../recoil/DramasDataAtom';
import { useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import PropTypes from 'prop-types';
import { Heart, HeartFill } from 'react-bootstrap-icons';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function DramaDetail({ onClick, active }) {
  const { id } = useParams();
  const [drama, setDrama] = useState([]);
  const dramas = useRecoilValue(DramasDataAtom);

  useEffect(() => {
    setDrama(dramas.find((drama) => drama.id === parseInt(id)));
  }, [drama]);
  console.log;

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Poster src={API_IMG + drama.poster_path} alt={drama.name} />
        {/* <HeartIcon onClick={onClick} />
        <HeartFillIcon onClick={onClick} /> */}
        {active ? (
          <HeartFillIcon onClick={onClick} />
        ) : (
          <HeartIcon onClick={onClick} />
        )}
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
      </Wrapper>
    </ThemeProvider>
  );
}

DramaDetail.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

export default DramaDetail;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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
