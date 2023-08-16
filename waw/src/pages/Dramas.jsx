import { useEffect } from 'react';
import { DramasDataAtom } from '../recoil/DramasDataAtom';
import { useRecoilState } from 'recoil';
// import { Pagination } from '@mui/material';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import Contents from '../components/Contents';

function Movies() {
  const [dramas, setDramas] = useRecoilState(DramasDataAtom);

  useEffect(() => {
    console.log(dramas);
  }, []);

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
        {/* <Pagination count={10} /> */}
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
`;

const DramaCard = styled.div`
  gap: 10px;
`;
