import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { Block, Main, MenuAttrItem } from '@flumens';
import { IonList } from '@ionic/react';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';
import PhotoPicker from 'Survey/Components/PhotoPicker';
import VerificationMessage from 'Survey/Components/VerificationMessage';
import { certaintyAttr, commentAttr, quantityAttr } from 'Survey/config';
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

        <div className="rounded-list mb-2">
          <PhotoPicker
            model={occurrence}
            placeholder={
              <div className="p-3">
                <T>No species photo has been added.</T>
              </div>
            }
          />
        </div>

        <div className="rounded-list">
          <Block block={quantityAttr} {...recordAttrs} />
          <Block block={certaintyAttr} {...recordAttrs} />

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
