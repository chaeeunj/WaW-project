import styled, { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import PropTypes from 'prop-types';

function Contents({ firstGroupedData }) {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <CardWrapper>
          {firstGroupedData && (
            <ContentsCard>
              <Img src={firstGroupedData.image} alt={firstGroupedData.title} />
              <Title>{firstGroupedData.title}</Title>
            </ContentsCard>
          )}
        </CardWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

Contents.propTypes = {
  firstGroupedData: PropTypes.array.isRequired,
};

export default Contents;

const Wrapper = styled.div`
  width: 1175px;
  height: 100%;
  margin: 50px auto;
`;

const CardWrapper = styled.div`
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 30px 0;
`;

const ContentsCard = styled.div`
  /* height: 270px; */
  margin-right: 55px;
`;

const Img = styled.img`
  width: 175px;
  height: 240px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.contents_title};
  font-size: 15px;
`;
