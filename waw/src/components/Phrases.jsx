import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

function Phrases() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Introduce>
          다양한 OTT에서 시청한 컨텐츠를 한 곳에서 기록하는 편리함
        </Introduce>
        <Logo>
          <LogoPoint>W</LogoPoint>atching <LogoPoint>a</LogoPoint>nd{' '}
          <LogoPoint>W</LogoPoint>riting
        </Logo>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Phrases;

const Wrapper = styled.div`
  margin-top: 10%;
  text-align: center;
`;

const Introduce = styled.div`
  color: ${({ theme }) => theme.main_text};
  font-size: 20px;
  margin-bottom: 30px;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.main_text};
  font-size: 28px;
`;

const LogoPoint = styled.span`
  color: ${({ theme }) => theme.point_blue};
  font-weight: 600;
`;
