import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

function SearchBar() {
  return (
    <ThemeProvider theme={theme}>
      <SearchBarWrapper>
        <StyledInput
          type="text"
          placeholder="영화나 드라마의 제목을 검색해보세요"
        />
        <SearchImg src="/search.png"></SearchImg>
      </SearchBarWrapper>
    </ThemeProvider>
  );
}

export default SearchBar;

const SearchBarWrapper = styled.div`
  width: 750px;
  display: flex;
  align-items: center;
  padding: 15px 10px;
  background-color: ${({ theme }) => theme.light_yellow};
  border-radius: 5px;
`;

const StyledInput = styled.input`
  width: 600px;
  height: inherit;
  background-color: inherit;
  color: ${({ theme }) => theme.main_text};
  font-size: 18px;
  margin-left: 15px;
  outline: none;
  border: none;
`;

const SearchImg = styled.img`
  margin-left: 90px;
`;
