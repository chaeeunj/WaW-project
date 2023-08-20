import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { SearchValueAtom } from '../recoil/SearchAtom';
import { CategoryAtom } from '../recoil/CategoryAtom';
import { MoviesDataAtom } from '../recoil/MoviesDataAtom';
import { DramasDataAtom } from '../recoil/DramasDataAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Contents from './Contents';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function SearchBar() {
  const [movies, setMovies] = useRecoilState(MoviesDataAtom);
  const [dramas, setDramas] = useRecoilState(DramasDataAtom);
  const category = useRecoilValue(CategoryAtom);
  const [searchValue, setSearchValue] = useRecoilState(SearchValueAtom);
  const navigate = useNavigate();

  const fetchDataForPage = async (value) => {
    try {
      // 각 페이지에 맞는 API 주소 생성
      const encodedValue = encodeURIComponent(value);
      const apiURL =
        category === 'movie'
          ? `https://api.themoviedb.org/3/search/movie?api_key=7a170163b1751c8516b4112e0a10f71d&query=${encodedValue}&include_adult=false&language=ko-KR&page=1&region=kr`
          : `https://api.themoviedb.org/3/search/tv?api_key=7a170163b1751c8516b4112e0a10f71d&query=${encodedValue}&include_adult=false&language=ko-KR&page=1`;

      const response = await fetch(apiURL);
      const data = await response.json();

      category === 'movie' ? setMovies(data.results) : setDramas(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showResults =
    category === 'movie' ? movies.slice(0, 4) : dramas.slice(0, 4);
  const showOnlyTitle =
    category === 'movie' ? movies.slice(4, 8) : dramas.slice(4, 8);

  const onClickSearchButton = () => {
    navigate('/search/results');
  };

  useEffect(() => {
    fetchDataForPage(searchValue);
  }, [searchValue]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <SearchBarWrapper>
          {category === 'movie' ? (
            <StyledInput
              type="text"
              placeholder="영화의 제목을 검색해보세요"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          ) : (
            <StyledInput
              type="text"
              placeholder="TV 프로그램의 제목을 검색해보세요"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}

          <SearchImg
            src="/search.png"
            onClick={onClickSearchButton}></SearchImg>
        </SearchBarWrapper>
        <ShowResultsWithImgWrapper>
          {category === 'movie'
            ? showResults.map((result) => (
                <ShowInfo key={result.id} to={`/${category}/${result.id}`}>
                  <InfoImg src={API_IMG + result.poster_path}></InfoImg>
                  <InfoTitle>{result.title}</InfoTitle>
                </ShowInfo>
              ))
            : showResults.map((result) => (
                <ShowInfo key={result.id} to={`/drama/${result.id}`}>
                  <InfoImg src={API_IMG + result.poster_path}></InfoImg>
                  <InfoTitle>{result.name}</InfoTitle>
                </ShowInfo>
              ))}
        </ShowResultsWithImgWrapper>
        <ShowOnlyTitleWrapper>
          {category === 'movie'
            ? showOnlyTitle.map((result) => (
                <OnlyTitle key={result.id} to={`/movie/${result.id}`}>
                  {result.title}
                </OnlyTitle>
              ))
            : showOnlyTitle.map((result) => (
                <OnlyTitle key={result.id} to={`/drama/${result.id}`}>
                  {result.name}
                </OnlyTitle>
              ))}
        </ShowOnlyTitleWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

// SearchBar.propTypes = {
//   category: PropTypes.string.isRequired,
// };

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBarWrapper = styled.div`
  width: 750px;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.light_yellow};
  border-radius: 5px;
  margin-bottom: 10px;
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
  cursor: pointer;
`;

const ShowResultsWithImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const ShowInfo = styled(Link)`
  white-space: nowrap;
  text-decoration: none;
`;

const InfoImg = styled.img`
  width: 160px;
  height: 220px;
`;

const InfoTitle = styled.p`
  font-size: 14px;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.contents_title};
`;

const ShowOnlyTitleWrapper = styled.div`
  margin: 20px 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OnlyTitle = styled(Link)`
  color: ${({ theme }) => theme.contents_title};
  text-decoration: none;
`;
