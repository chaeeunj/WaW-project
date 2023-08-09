import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';

function TextButton({ name, onClick, color, fontSize, fontWeight }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledTextButton
        onClick={onClick}
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}>
        {name}
      </StyledTextButton>
    </ThemeProvider>
  );
}

TextButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontWeight: PropTypes.number.isRequired,
};

export default TextButton;

const StyledTextButton = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  cursor: pointer;
`;
