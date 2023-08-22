import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { auth } from '../services/firebase';
import PropTypes from 'prop-types';

import Button from './Buttons/Button';

function Modal({ modalOpen, modalClose, withdrawal }) {
  // const onclickSignOutButton = () => {};

  const onclickCancelButton = () => {
    modalClose();
    !modalOpen;
  };

  return (
    <ThemeProvider theme={theme}>
      {modalOpen && (
        <Wrapper>
          <Title>WaW를 탈퇴하시겠습니까?</Title>
          <ButtonWrapper>
            <Button
              name={'탈퇴'}
              onClick={withdrawal}
              bgColor={theme.light_yellow}
              color={theme.contents_title}
              fontSize={'16px'}
              padding={'10px 20px'}
              borderRadius={'7px'}
            />

            <Button
              name={'취소'}
              onClick={onclickCancelButton}
              bgColor={theme.light_yellow}
              fontSize={'16px'}
              padding={'10px 20px'}
              borderRadius={'7px'}
            />
          </ButtonWrapper>
        </Wrapper>
      )}
    </ThemeProvider>
  );
}

Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  withdrawal: PropTypes.func.isRequired,
};

export default Modal;

const Wrapper = styled.div`
  position: absolute;
  width: 50%;
  height: 60vh;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.main_yellow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: ;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
