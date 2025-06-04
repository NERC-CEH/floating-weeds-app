import { observer } from 'mobx-react';
import { imageOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { getRelativeDate, useAlert } from '@flumens';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from '@ionic/react';
import VerificationListStatus from 'common/Components/VerificationListStatus';
import Sample from 'common/models/sample';
import ErrorMessage from './components/ErrorMessage';
import OnlineStatus from './components/OnlineStatus';
import './styles.scss';

function deleteSurvey(sample: Sample, alert: any) {
  alert({
    header: 'Delete',
    message: <T>Are you sure you want to delete this record ?</T>,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: 'Delete',
        cssClass: 'danger',
        handler: () => sample.destroy(),
      },
    ],
  });
}

type Props = { sample: Sample };

const Survey = ({ sample }: Props) => {
  const alert = useAlert();

  const speciesPhoto = sample.media.length
    ? sample.media[0].data.thumbnail
    : null;

  const href = !sample.isSynchronising ? `/survey/${sample.cid}` : undefined;

  const getProfilePhoto = () => {
    const photo = speciesPhoto ? (
      <img src={speciesPhoto} />
    ) : (
      <div className="flex h-full w-full items-center justify-center object-contain">
        <IonIcon src={imageOutline} className="size-8 text-primary-600" />
      </div>
    );

    return <div className="record-photo-profile">{photo}</div>;
  };

  function getSampleInfo() {
    const { date } = sample.data;

    return (
      <div className="record-info">
        <h3>
          <T>Record</T>
        </h3>
        <p>
          <T>{getRelativeDate(date)}</T>
        </p>
      </div>
    );
  }

  const deleteSurveyWrap = () => deleteSurvey(sample, alert);

  return (
    <IonItemSliding class="survey-list-item">
      <ErrorMessage sample={sample} />

      <IonItem routerLink={href} lines="none" detail={!sample.isSynchronising}>
        {getProfilePhoto()}

        <IonLabel className="ion-no-margin">{getSampleInfo()}</IonLabel>
        <OnlineStatus sample={sample} />

        <VerificationListStatus sample={sample} key={sample.cid} />
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={deleteSurveyWrap}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default observer(Survey);
