import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';

function Button({ name, onClick, bgColor, color, fontSize }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton onClick={onClick} bgColor={bgColor} color={color} fontSize={fontSize}>
        {name}
      </StyledButton>
    </ThemeProvider>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
};

export default Button;

const StyledButton = styled.button``;
