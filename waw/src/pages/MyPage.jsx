import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { auth } from '../services/firebase';
import {
  signOut,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { UserDataAtom } from '../recoil/UserDataAtom';
import { IsLoginAtom } from '../recoil/IsLoginAtom';
import { useSetRecoilState } from 'recoil';

import TextButton from '../components/Buttons/TextButton';
import Modal from '../components/Modal';

function MyPage() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const setUserData = useSetRecoilState(UserDataAtom);
  const setIsLogin = useSetRecoilState(IsLoginAtom);

  const handleWithdrawal = async () => {
    try {
      // const credential = promptForCredentials();
      // await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      localStorage.removeItem('userName');
      localStorage.removeItem('isLogin');
      setIsLogin(false);
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onclickTextBtn = (page) => {
    navigate(page);
  };

  const onclickLogOutBtn = () => {
    signOut(auth)
      .then(() => {
        setUserData({
          name: '',
          email: '',
          password: '',
        });
        localStorage.removeItem('userName');
        localStorage.removeItem('isLogin');
        setIsLogin(false);
      }) // logout successful
      .catch((error) => {
        console.log(error);
      });

    navigate('/');
  };

  useEffect(() => {}, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Modal
          modalOpen={modalOpen}
          modalClose={handleModalClose}
          withdrawal={handleWithdrawal}
        />
        <Title>
          <UserName>{user.displayName}</UserName>님 안녕하세요!
        </Title>
        <PageList>
          <li>
            <TextButton
              name={'회원정보 수정'}
              onClick={() => onclickTextBtn('/mypage/userinfo')}
              fontSize={'20px'}
            />
          </li>
          <li>
            <TextButton
              name={'다시 보고싶은 TV 프로그램'}
              onClick={() => onclickTextBtn('/mydrama')}
              fontSize={'20px'}
            />
          </li>
          <li>
            <TextButton
              name={'다시 보고싶은 영화'}
              onClick={() => onclickTextBtn('/mymovie')}
              fontSize={'20px'}
            />
          </li>
          <li>
            <TextButton
              name={'로그아웃'}
              onClick={onclickLogOutBtn}
              fontSize={'20px'}
            />
          </li>
          <li>
            <TextButton
              name={'회원탈퇴'}
              onClick={handleModalOpen}
              fontSize={'20px'}
            />
          </li>
        </PageList>
      </Wrapper>
    </ThemeProvider>
  );
}

export default MyPage;

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.main_text};
  margin-bottom: 60px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.point_blue};
`;

const PageList = styled.ul`
  list-style-type: disc;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
