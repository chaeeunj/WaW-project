import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { useRecoilValue } from 'recoil';
import { MoviesDataAtom } from '../recoil/MoviesDataAtom';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function Contents({ data, category }) {
  // const movies = useRecoilValue(MoviesDataAtom);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <CardWrapper>
          {data && category === 'movie' ? (
            <ContentsCard to={`/${category}/${data.id}`}>
              <Img src={API_IMG + data.poster_path} alt={data.title} />
              <Title>{data.title}</Title>
            </ContentsCard>
          ) : (
            <ContentsCard to={`/${category}/${data.id}`}>
              <Img src={API_IMG + data.poster_path} alt={data.name} />
              <Title>{data.name}</Title>
            </ContentsCard>
          )}
        </CardWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

Contents.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
};

export default Contents;

const Wrapper = styled.div`
  width: 1175px;
  height: 100%;
`;

const CardWrapper = styled.div`
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0;
`;

const ContentsCard = styled(Link)`
  margin-right: 55px;
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
