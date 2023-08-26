import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DramasDataAtom } from '../../recoil/DramasDataAtom';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { auth, db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

import Pagination from '../../components/Pagination';

const API_IMG = 'https://image.tmdb.org/t/p/w500/';

function MyDrama() {
  const user = auth.currentUser;
  const [dramas, setDramas] = useRecoilState(DramasDataAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(dramas.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dramasToShow = dramas.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getLikedDramas = async () => {
    try {
      const userLikedDrama = await getDocs(collection(db, 'userLikedDrama'));
      const likedDrama = userLikedDrama.docs.map((doc) => doc.data());
      setDramas(likedDrama);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getLikedDramas();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>다시 보고싶은 TV 프로그램</PageTitle>
        <DramaContainer>
          <CardWrapper>
            {user &&
              dramasToShow.map(
                (drama) =>
                  user.uid === drama.userId && (
                    <ContentsCard to={`/drama/${drama.id}`} key={drama.id}>
                      <Img src={API_IMG + drama.poster_path} alt={drama.name} />
                      <Title>{drama.name}</Title>
                    </ContentsCard>
                  )
              )}
          </CardWrapper>
        </DramaContainer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default MyDrama;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  position: relative;
  left: -470px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.point_blue};
`;

const DramaContainer = styled.div`
  margin: 30px 0;
  width: 1175px;
  height: 100%;
`;

const CardWrapper = styled.div`
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContentsCard = styled(Link)`
  margin: 15px;
  text-decoration: none;
`;

const Img = styled.img`
  width: 175px;
  height: 240px;
`;

const Title = styled.h1`
  width: 175px;
  color: ${({ theme }) => theme.contents_title};
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
