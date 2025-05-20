import { observer } from 'mobx-react';
import { Page, Header, useSample } from '@flumens';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';
import Main from './Main';
import './styles.scss';

const OccurrenceHome = () => {
  const { sample, occurrence } = useSample<Sample, Occurrence>();

  return (
    <Page id="edit-occurrence">
      <Header title="Edit Species" />
      <Main occurrence={occurrence!} sample={sample!} />
    </Page>
  );
};

export default observer(OccurrenceHome);
