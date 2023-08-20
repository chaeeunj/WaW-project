import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { SearchValueAtom } from '../../recoil/SearchAtom';
import { CategoryAtom } from '../../recoil/CategoryAtom';
import { MoviesDataAtom } from '../../recoil/MoviesDataAtom';
import { DramasDataAtom } from '../../recoil/DramasDataAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import Contents from '../../components/Contents';
import Pagination from '../../components/Pagination';

function SearchResults() {
  const [movies, setMovies] = useRecoilState(MoviesDataAtom);
  const [dramas, setDramas] = useRecoilState(DramasDataAtom);
  const searchValue = useRecoilValue(SearchValueAtom);
  const category = useRecoilValue(CategoryAtom);
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages;

  if (category === '영화' && movies.length < 20) {
    totalPages = currentPage;
  } else if (category === 'TV' && dramas.length < 20) {
    totalPages = currentPage;
  } else {
    totalPages = 20;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchDataForPage = async (currentPage) => {
    try {
      // 각 페이지에 맞는 API 주소 생성
      const encodedValue = encodeURIComponent(searchValue);
      const apiURL =
        category === '영화'
          ? `https://api.themoviedb.org/3/search/movie?api_key=7a170163b1751c8516b4112e0a10f71d&query=${encodedValue}&include_adult=false&language=ko-KR&page=${currentPage}&region=kr`
          : `https://api.themoviedb.org/3/search/tv?api_key=7a170163b1751c8516b4112e0a10f71d&query=${encodedValue}&include_adult=false&language=ko-KR&page=${currentPage}`;

      const response = await fetch(apiURL);
      const data = await response.json();

      category === '영화' ? setMovies(data.results) : setDramas(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataForPage(currentPage);
  }, [currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title>
          <SearchValue>&lsquo;{searchValue}&rsquo;</SearchValue> 검색어가 포함된{' '}
          {category} 검색 결과입니다.
        </Title>
        <AllContentsWrapper>
          {category === '영화' ? (
            <ContentsCard>
              {movies.map((movie) => (
                <Contents key={movie.id} data={movie} category={'movie'} />
              ))}
            </ContentsCard>
          ) : (
            <ContentsCard>
              {dramas.map((drama) => (
                <Contents key={drama.id} data={drama} category={'drama'} />
              ))}
            </ContentsCard>
          )}
        </AllContentsWrapper>
        <PaginationWrapper>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </PaginationWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default SearchResults;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.main_text};
`;

const SearchValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.point_blue};
`;

const AllContentsWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;
`;

const ContentsCard = styled.div``;

const PaginationWrapper = styled.div`
  margin-bottom: 20px;
`;
