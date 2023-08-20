import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import DramaDetail from '../../components/ContentsDetail/DramaDetail';

function DramaReview() {
  const [heartIsActive, setHeartIsActive] = useState(false);

  const onClickHeart = () => {
    !setHeartIsActive;
  };

  return (
    <ThemeProvider theme={theme}>
      <DramaDetail onClick={onClickHeart} active={heartIsActive} />
    </ThemeProvider>
  );
}

export default DramaReview;
