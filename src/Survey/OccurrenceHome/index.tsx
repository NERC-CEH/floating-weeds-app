import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Header, useSample } from '@flumens';
import { NavContext } from '@ionic/react';
import Occurrence from 'models/occurrence';
import Sample, { useValidateCheck } from 'models/sample';
import HeaderButton from 'Survey/Components/HeaderButton';
import Main from './Main';
import './styles.scss';

const OccurrenceHome = () => {
  const { goBack } = useContext(NavContext);
  const { sample, occurrence } = useSample<Sample, Occurrence>();
  const showValidateCheck = useValidateCheck(occurrence);

  const isInValid = !!occurrence?.validateRemote()?.attributes;

  const doneButton = (
    <HeaderButton
      isInvalid={isInValid}
      onClick={() => {
        showValidateCheck();
        if (isInValid) return;

        goBack();
      }}
    >
      Done
    </HeaderButton>
  );

  return (
    <Page id="edit-occurrence">
      <Header title="Edit Species" rightSlot={doneButton} />
      <Main occurrence={occurrence!} sample={sample!} />
    </Page>
  );
};

export default observer(OccurrenceHome);
