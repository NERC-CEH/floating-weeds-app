import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router';
import { Block, Main, MenuAttrItem } from '@flumens';
import { IonList } from '@ionic/react';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';
import VerificationMessage from 'Survey/Components/VerificationMessage';
import { commentAttr } from 'Survey/config';
import './styles.scss';

type Props = {
  sample: Sample;
  occurrence: Occurrence;
};

const OccurrenceMain = ({ sample, occurrence }: Props) => {
  const { url } = useRouteMatch();
  const isDisabled = sample.isUploaded;

  const recordAttrs = {
    record: occurrence.data,
    isDisabled: sample.isDisabled,
  };

  const sampleBaseUrl = url.split('/occ');
  sampleBaseUrl.pop();

  return (
    <Main id="occurrence-edit">
      <IonList lines="full">
        {isDisabled && (
          <div className="rounded-list mb-2">
            <VerificationMessage occurrence={occurrence} />
          </div>
        )}

        <div className="rounded-list">
          <MenuAttrItem
            routerLink={`${url}/species`}
            disabled={isDisabled}
            // icon={butterflyIcon}
            label="Species"
            value={occurrence.data.taxon.commonName}
          />

          <Block block={commentAttr} {...recordAttrs} />
        </div>
      </IonList>
    </Main>
  );
};

export default observer(OccurrenceMain);
