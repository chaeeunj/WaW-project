import { useRecoilValue } from 'recoil';
import { ContentsDataAtom } from '../recoil/ContentsDataAtom';
import Contents from '../components/Contents';
import TextButton from '../components/Buttons/TextButton';

import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

function Main() {
  const navigate = useNavigate();

  const onclickTextBtn = (page) => {
    navigate(page);
  };
  const contents = useRecoilValue(ContentsDataAtom);

  // const firstGroupedData = contents.slice(0, 5);

  return (
    <div>
      <TextButton
        name={'WaW'}
        onClick={() => onclickTextBtn('/main')}
        color={theme.point_blue}
        fontSize={'20px'}
        fontWeight={600}
        margin={'0 auto'}
      />
      {contents.map((detail) => (
        <Contents key={detail.id} firstGroupedData={detail} />
      ))}
    </div>
  );
}

export default Main;
