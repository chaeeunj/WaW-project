import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserDataAtom } from '../recoil/UserDataAtom';
import { IsLoginAtom } from '../recoil/IsLoginAtom';
import { auth, db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import styled, { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import Button from '../components/Buttons/Button';
import TextButton from '../components/Buttons/TextButton';

function Login() {
  const [userData, setUserData] = useRecoilState(UserDataAtom);
  const [isLogin, setIsLogin] = useRecoilState(IsLoginAtom);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, [userData]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName;
      const email = user.email;

      setUserData({
        name: name,
        email: email,
        uid: user.uid,
      });

      await addDoc(collection(db, 'userAccount'), {
        name: name,
        email: email,
        uid: user.uid,
      });

      setIsLogin(true);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('userName', name);

      navigate('/main');
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      setIsLogin(true);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('userName', userCredential.user.displayName);
    } catch (error) {
      console.log(error.message);
      alert('로그인 정보가 일치하지 않습니다.');
    }
  };

  const onclickLoginButton = async (page) => {
    try {
      await login();

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const userName = user.displayName;

          setUserData({
            name: userName,
            email: loginEmail,
            uid: uid,
          });

          await addDoc(collection(db, 'userAccount'), {
            name: userName,
            email: loginEmail,
            uid: uid,
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }

    navigate(page);
  };

  const onclickJoinButton = (page) => {
    navigate(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageInfo>로그인</PageInfo>
        <Button
          name={'구글로 시작하기'}
          onClick={handleGoogleLogin}
          fontSize={'16px'}
          fontWeight={'500'}
          padding={'12px 80px'}
        />
        <EmailLogin>또는 이메일로 로그인</EmailLogin>
        <LoginWrapper>
          <UserInput>
            <StyledInput
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <StyledInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </UserInput>
          <Button
            name={'로그인'}
            onClick={() => onclickLoginButton('/main')}
            fontSize={'16px'}
            fontWeight={'500'}
            padding={'12px 114px'}
          />
        </LoginWrapper>
        <Line></Line>
        <TextButtonLine>
          <TextButton
            name={'이메일로 회원가입'}
            onClick={() => onclickJoinButton('/join')}
            fontSize={'16px'}
          />
        </TextButtonLine>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Login;

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
  margin-bottom: 65px;
`;

const EmailLogin = styled.p`
  position: relative;
  color: ${({ theme }) => theme.main_text};
  margin-top: 35px;

  &::before {
    content: ' ';
    display: block;
    width: 450px;
    height: 1px;
    position: absolute;
    bottom: 7px;
    right: 180px;
    background-color: ${({ theme }) => theme.basic_line};
  }

  &::after {
    content: ' ';
    display: block;
    width: 450px;
    height: 1px;
    position: absolute;
    bottom: 7px;
    left: 180px;
    background-color: ${({ theme }) => theme.basic_line};
  }
`;

const LoginWrapper = styled.div`
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

const TextButtonLine = styled.div`
  position: relative;
  margin-top: 35px;

  &::before {
    content: ' ';
    display: block;
    width: 134px;
    height: 1px;
    position: absolute;
    bottom: -5px;
    left: 0;
    background-color: ${({ theme }) => theme.basic_line};
  }
`;
