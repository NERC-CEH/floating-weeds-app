import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Main, Header, Block } from '@flumens';
import { NavContext } from '@ionic/react';
import Sample from 'models/sample';
import HeaderButton from './Components/HeaderButton';
import { activitiesGroupAttr } from './config';

type Props = {
  sample: Sample;
};

const Activities = ({ sample }: Props) => {
  const { goBack } = useContext(NavContext);

  const doneButton = <HeaderButton onClick={() => goBack()}>Done</HeaderButton>;

  return (
    <Page id="taxon-search" className="attr-page">
      <Header title="Activities" rightSlot={doneButton} />
      <Main>
        <div className="flex flex-col gap-3 py-2">
          <Block
            record={sample.data}
            block={activitiesGroupAttr}
            isWithinPage
          />
        </div>
      </Main>
    </Page>
  );
};

export default observer(Activities);
