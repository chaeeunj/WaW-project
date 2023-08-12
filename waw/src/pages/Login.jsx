// import { useRecoilState } from 'recoil';
// import { UserDataAtom } from '../recoil/UserDataAtom';
// import { auth } from '../services/login';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// function Login() {
//   const [userData, setUserData] = useRecoilState(UserDataAtom);

//   function handleGoogleLogin() {
//     const provider = new GoogleAuthProvider(); // provider 구글 설정
//     signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
//       .then((data) => {
//         setUserData(data.user); // user data 설정
//         console.log(data); // console에 UserCredentialImpl 출력
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   return (
//     <div>
//       <h3>구글 로그인 테스트</h3>
//       <button onClick={handleGoogleLogin}>로그인</button>
//       <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
//       <div>
//         {userData
//           ? '당신의 이름은 : ' + userData.displayName
//           : '로그인 버튼을 눌러주세요 :)'}
//       </div>
//     </div>
//   );
// }

// export default Login;

import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import theme from '../styles/theme';
import Button from '../components/Buttons/Button';
import TextButton from '../components/Buttons/TextButton';

function Login() {
  const navigate = useNavigate();

  const onclickButton = (page) => {
    navigate(page);
  };

  const handleGoogleLogin = () => {};

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
            />
            <StyledInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </UserInput>
          <Button
            name={'로그인'}
            onClick={() => onclickButton('/main')}
            fontSize={'16px'}
            fontWeight={'500'}
            padding={'12px 114px'}
          />
        </LoginWrapper>
        <Line></Line>
        <TextButtonLine>
          <TextButton
            name={'이메일로 회원가입'}
            onClick={() => onclickButton('/join')}
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
  height: 25px;
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
