import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { auth } from '../services/firebase';
import { updateProfile, updatePassword } from 'firebase/auth';

import Button from '../components/Buttons/Button';

function UserInfoUpdate() {
  const user = auth.currentUser;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const navigate = useNavigate();

  const onclickSaveButton = async () => {
    if (passwordChanged) {
      try {
        await updatePassword(user, password);
      } catch (error) {
        console.error(error);
      }
    }
    if (nameChanged) {
      try {
        await updateProfile(user, {
          displayName: name,
        });
      } catch (error) {
        console.error(error);
      }
    }
    alert('회원정보 수정이 완료되었습니다. 다시 로그인 후 이용 부탁드립니다.');
    navigate('/mypage');
  };

  useEffect(() => {
    setPasswordChanged(password !== '');
  }, [password]);

  useEffect(() => {
    setNameChanged(name !== '');
  }, [name]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageInfo>회원정보</PageInfo>
        <Line></Line>
        <UserInfoWrapper>
          <UserInput>
            <StyledLabel htmlFor="name">이름</StyledLabel>
            <StyledInput
              name="name"
              type="text"
              defaultValue={user.displayName}
              onChange={(e) => setName(e.target.value)}
            />
          </UserInput>
          <UserInput>
            <StyledLabel htmlFor="email">이메일</StyledLabel>
            <StyledInput
              name="email"
              type="email"
              value={user.email}
              disabled
            />
          </UserInput>
          <UserInput>
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            <StyledInput
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </UserInput>
          <UserInput>
            <StyledLabel htmlFor="passwordCheck">비밀번호 확인</StyledLabel>
            <StyledInput
              name="passwordCheck"
              type="password"
              placeholder="6자리 이상 입력"
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </UserInput>

          {password === checkPassword ? (
            ''
          ) : (
            <CheckMessage>비밀번호를 확인해주세요</CheckMessage>
          )}
          <Button
            name={'저장'}
            onClick={onclickSaveButton}
            fontSize={'16px'}
            fontWeight={'500'}
            padding={'12px 114px'}
          />
        </UserInfoWrapper>
        <Line></Line>
      </Wrapper>
    </ThemeProvider>
  );
}

export default UserInfoUpdate;

const Wrapper = styled.div`
  margin-top: 70px;
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
  margin-top: 20px;

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

const UserInfoWrapper = styled.div`
  margin-top: 20px;
`;

const UserInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

const StyledLabel = styled.label``;

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
