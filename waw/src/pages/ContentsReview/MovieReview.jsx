import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import MovieDetail from '../../components/ContentsDetail/MovieDetail';

function MovieReview() {
  const [heartIsActive, setHeartIsActive] = useState(false);

  const onClickHeart = () => {
    !setHeartIsActive;
  };

  return (
    <ThemeProvider theme={theme}>
      <MovieDetail onClick={onClickHeart} active={heartIsActive} />
    </ThemeProvider>
  );
}

export default MovieReview;
