import Button from '../components/Buttons/Button';
import Phrases from '../components/Phrases';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

function Start() {
  const navigate = useNavigate();

  const onclickButton = (page) => {
    navigate(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Phrases />
        <ButtonWrapper>
          <Button
            name={'기록 시작하기'}
            onClick={() => onclickButton('/login')}
            fontSize={'20px'}
            padding={'12px 30px'}
          />
        </ButtonWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Start;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;
