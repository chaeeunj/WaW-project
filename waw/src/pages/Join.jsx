import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import theme from '../styles/theme';
import Button from '../components/Buttons/Button';

function Join() {
  const navigate = useNavigate();

  const onclickJoinButton = (page) => {
    alert('회원가입이 완료되었습니다. 로그인 후 이용해주세요.');
    navigate(page);
  };

  // const handleGoogleLogin = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageInfo>회원가입</PageInfo>
        <Line></Line>
        <JoinWrapper>
          <UserInput>
            <StyledInput type="text" placeholder="이름" />
            <StyledInput type="email" placeholder="이메일 주소" />
            <StyledInput type="password" placeholder="비밀번호" />
            <StyledInput type="password" placeholder="비밀번호 확인" />
          </UserInput>
          <Button
            name={'회원가입'}
            onClick={() => onclickJoinButton('/login')}
            fontSize={'16px'}
            fontWeight={'500'}
            padding={'12px 114px'}
          />
        </JoinWrapper>
        <Line></Line>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Join;

const Wrapper = styled.div`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageInfo = styled.h1`
  color: ${({ theme }) => theme.main_text};
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 55px;
`;

const Line = styled.div`
  position: relative;
  margin-top: 35px;

  &::before {
    content: ' ';
    display: block;
    width: 550px;
    height: 0.8px;
    position: absolute;
    bottom: 7px;
    left: 0;
    background-color: ${({ theme }) => theme.basic_line};
  }

  &::after {
    content: ' ';
    display: block;
    width: 552px;
    height: 0.8px;
    position: absolute;
    bottom: 7px;
    right: 0;
    background-color: ${({ theme }) => theme.basic_line};
  }
`;

const JoinWrapper = styled.div`
  margin-top: 30px;
`;

const UserInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  height: 27px;
  background-color: ${({ theme }) => theme.light_yellow};
  border: none;
`;
