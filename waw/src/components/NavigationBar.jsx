import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserDataAtom } from '../recoil/UserDataAtom';
import { IsMainPageAtom } from '../recoil/IsMainPageAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import TextButton from './Buttons/TextButton';

function NavigationBar() {
  const userData = useRecoilValue(UserDataAtom);
  const isMainPage = useRecoilValue(IsMainPageAtom);
  const navigate = useNavigate();

  const onclickTextBtn = (page) => {
    navigate(page);
  };

  return (
    <ThemeProvider theme={theme}>
      {isMainPage ? (
        <Wrapper>
          <SearchImg
            src="/search.png"
            onClick={() => onclickTextBtn('/search')}></SearchImg>
          <LogoWrapper>
            <TextButton
              name={'WaW'}
              onClick={() => onclickTextBtn('/main')}
              color={theme.point_blue}
              fontSize={'20px'}
              fontWeight={600}
            />
          </LogoWrapper>
          <UserInfo>
            <UserName>{userData.name}님</UserName>
            <TextButton
              name={'마이페이지'}
              onClick={() => onclickTextBtn('/mypage')}
              color={theme.main_text}
              fontSize={'15px'}
              fontWeight={400}
            />
          </UserInfo>
        </Wrapper>
      ) : (
        <Wrapper>
          <LogoWrapper>
            <TextButton
              name={'WaW'}
              onClick={() => onclickTextBtn('/main')}
              color={theme.point_blue}
              fontSize={'20px'}
              fontWeight={600}
            />
          </LogoWrapper>
        </Wrapper>
      )}
    </ThemeProvider>
  );
}

export default NavigationBar;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.main_yellow};
`;

const SearchImg = styled.img`
  margin-left: 16px;
  color: ${({ theme }) => theme.main_text};
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  position: relative;
  right: 16px;
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.main_text};
  font-size: 15px;
  font-weight: 500;
  margin-right: 16px;
`;
