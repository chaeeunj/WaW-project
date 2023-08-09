import { useNavigate } from 'react-router-dom';
import TextButton from './Btn/TextButton';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

function NavigationBar() {
  const navigate = useNavigate();

  const onclickTextBtn = (page) => {
    navigate(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <SearchImg
          src="/search.png"
          onClick={() => onclickTextBtn('/search')}></SearchImg>
        <TextButton
          name={'WaW'}
          onClick={() => onclickTextBtn('/main')}
          color={theme.point_blue}
          fontSize={'20px'}
          fontWeight={600}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default NavigationBar;

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.main_yellow};
`;

const SearchImg = styled.img`
  color: ${({ theme }) => theme.main_text};
  cursor: pointer;
`;
