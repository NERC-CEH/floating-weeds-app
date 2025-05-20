import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonItemDivider, IonLabel } from '@ionic/react';
import Sample from 'common/models/sample';

type Props = {
  sample: Sample;
};

function ErrorMessage({ sample }: Props) {
  if (!sample.error.message) {
    return null;
  }

  return (
    <IonItemDivider color="danger">
      <IonLabel class="ion-text-wrap">
        <T>
          <b>Upload</b>
        </T>
        {sample.error.message}
      </IonLabel>
    </IonItemDivider>
  );
}

export default observer(ErrorMessage);
