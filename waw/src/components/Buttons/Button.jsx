import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';

function Button({
  name,
  onClick,
  bgColor,
  color,
  fontSize,
  padding,
  borderRadius,
}) {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton
        onClick={onClick}
        bgColor={bgColor}
        color={color}
        fontSize={fontSize}
        padding={padding}
        borderRadius={borderRadius}>
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
  padding: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
};

export default Button;

const StyledButton = styled.button`
  border: none;
  background-color: ${(props) => props.bgColor || props.theme.main_yellow};
  color: ${(props) => props.color || props.theme.main_text};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || 0};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius || '0'};
  cursor: pointer;
`;
