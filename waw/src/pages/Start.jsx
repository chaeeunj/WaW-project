import Button from '../components/Buttons/Button';
import Phrases from '../components/Phrases';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

function Start() {
  const navigate = useNavigate();

  const onclickButton = (page) => {
    navigate(page);
  };

  return (
    <div>
      <Phrases />
      <Button
        name={'기록 시작하기'}
        onClick={() => onclickButton('/login')}
        bgColor={theme.main_yellow}
        color={theme.main_text}
        fontSize={'20px'}
        paddingLR={'30px'}
      />
    </div>
  );
}

export default Start;
