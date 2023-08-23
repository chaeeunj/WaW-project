import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { UserDataAtom } from '../recoil/UserDataAtom';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import styled, { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import Button from '../components/Buttons/Button';

function Join() {
  const [userData, setUserData] = useRecoilState(UserDataAtom);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  // const [samePassword, setSamePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userData);
    // localStorage.setItem('userName', name);
  }, [userData]);

  const register = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      // setUserData({
      //   name: name,
      //   email: email,
      //   password: password,
      // });

      if (user) {
        await updateProfile(user, {
          displayName: name,
        });
      } else {
        console.log('User is undefined.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onclickJoinButton = async (page) => {
    try {
      await register();
      alert('회원가입이 완료되었습니다. 로그인 후 이용해주세요.');
      navigate(page);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageInfo>회원가입</PageInfo>
        <Line></Line>
        <JoinWrapper>
          <UserInput>
            <StyledInput
              type="text"
              placeholder="이름"
              onChange={(e) => setName(e.target.value)}
            />
            <StyledInput
              type="email"
              placeholder="이메일 주소"
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
              type="password"
              placeholder="비밀번호(6자리 이상)"
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledInput
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </UserInput>
          {email.includes('@') ? (
            ''
          ) : (
            <CheckMessage>잘못된 이메일 주소입니다</CheckMessage>
          )}
          {password === checkPassword ? (
            ''
          ) : (
            <CheckMessage>비밀번호를 확인해주세요</CheckMessage>
          )}
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

const CheckMessage = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.point_blue};
  margin-bottom: 10px;
`;
