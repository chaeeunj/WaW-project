import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';

function Button({ name, onClick, bgColor, color, fontSize, paddingLR }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton
        onClick={onClick}
        bgColor={bgColor}
        color={color}
        fontSize={fontSize}
        paddingLR={paddingLR}>
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
  paddingLR: PropTypes.string.isRequired,
};

export default Button;

const StyledButton = styled.button`
  border: none;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  padding: 10px ${(props) => props.paddingLR};
  cursor: pointer;
`;
