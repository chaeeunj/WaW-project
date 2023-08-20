import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { SearchValueAtom } from '../../recoil/SearchAtom';
import { CategoryAtom } from '../../recoil/CategoryAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import SearchBar from '../../components/SearchBar';
import Button from '../../components/Buttons/Button';
import TextButton from '../../components/Buttons/TextButton';

function Search() {
  const [category, setCategory] = useRecoilState(CategoryAtom);
  const searchValue = useRecoilValue(SearchValueAtom);
  const navigate = useNavigate();

  const onClickAllContentsButton = () => {
    navigate('/search/results');
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <CategoryWrapper>
          <Button
            name={'영화'}
            onClick={() => setCategory('영화')}
            fontSize={'20px'}
            padding={'12px 20px'}
            borderRadius={'10px'}
          />
          <Button
            name={'TV'}
            onClick={() => setCategory('TV')}
            fontSize={'20px'}
            padding={'12px 20px'}
            borderRadius={'10px'}
          />
        </CategoryWrapper>
        <SearchBar />
        {searchValue && (
          <TextButtonWrapper>
            <TextButton
              name={'전체보기 >'}
              onClick={onClickAllContentsButton}
              fontSize={'16px'}
            />
          </TextButtonWrapper>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

export default Search;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextButtonWrapper = styled.div`
  margin: 30px 0 0 650px;
`;
