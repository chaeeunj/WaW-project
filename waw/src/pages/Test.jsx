import Button from '../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

function Test() {
  const navigate = useNavigate();

  const onclickButton = (page) => {
    navigate(page);
  };

  return (
    <div>
      <Button
        name={'구글로 로그인하기'}
        onClick={() => onclickButton('/login')}
        bgColor={theme.main_yellow}
        color={theme.main_text}
        fontSize={'20px'}
        paddingLR={'30px'}
      />
    </div>
  );
}

export default Test;
