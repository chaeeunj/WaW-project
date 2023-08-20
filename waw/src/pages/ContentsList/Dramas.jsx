import { useState, useEffect } from 'react';
import { DramasDataAtom } from '../../recoil/DramasDataAtom';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

import Contents from '../../components/Contents';
import Pagination from '../../components/Pagination';

function Movies() {
  const [dramas, setDramas] = useRecoilState(DramasDataAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchDataForPage = async (currentPage) => {
    try {
      // 각 페이지에 맞는 API 주소 생성
      const apiURL = `https://api.themoviedb.org/3/tv/top_rated?api_key=7a170163b1751c8516b4112e0a10f71d&language=ko-KR&region=kr&page=${currentPage}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      // 데이터를 처리하는 로직
      setDramas(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataForPage(currentPage);
  }, [currentPage]);
  console.log(dramas);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>TV, 드라마</PageTitle>
        <AllDramas>
          <DramaCard>
            {dramas.map((drama) => (
              <Contents key={drama.id} data={drama} category={'drama'} />
            ))}
          </DramaCard>
        </AllDramas>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default Movies;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const PageTitle = styled.h1`
  position: relative;
  left: -530px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.point_blue};
`;

const AllDramas = styled.div`
  margin-top: 50px;
  margin-bottom: 15px;
`;

const DramaCard = styled.div`
  gap: 10px;
`;
