import { useState } from 'react';
import { observer } from 'mobx-react';
import { helpCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Page, useAlert } from '@flumens';
import {
  IonLabel,
  IonIcon,
  IonButton,
  IonToggle,
  IonButtons,
  IonHeader,
  IonToolbar,
} from '@ionic/react';
import Main from './Main';
import fetchRecords from './recordsService';
import './styles.scss';

const useDurationOfRecordsAlert = () => {
  const alert = useAlert();

  const showDurationOfRecordsAlert = () =>
    alert({
      message: <T>The default setting is the past 4 weeks of records.</T>,
      buttons: [
        {
          text: 'OK, got it',
          role: 'cancel',
          cssClass: 'primary',
        },
      ],
    });

  return showDurationOfRecordsAlert;
};

const HomeMap = () => {
  const [isFetchingRecords, setIsFetchingRecords] = useState(false);
  const [isLongPeriod, setIsLongPeriod] = useState(false);
  const [records, setRecords] = useState([]);

  const [currentMapBounds, setCurrentMapBounds] = useState<any>(null);

  const showDurationOfRecordsAlert = useDurationOfRecordsAlert();

  const updateRecords = async (mapBounds: any, period: boolean) => {
    setIsFetchingRecords(true);
    const newRecords = await fetchRecords(
      mapBounds.getNorthWest(),
      mapBounds.getSouthEast(),
      period
    );
    setIsFetchingRecords(false);

    if (!newRecords) return;

    setRecords(newRecords);
  };

  const updateMapBounds = async (newBounds: any) => {
    setCurrentMapBounds(newBounds);
    updateRecords(newBounds, isLongPeriod);
  };

  const toggleLongPeriodReporting = (e: any) => {
    setIsLongPeriod(e.detail.checked);
    updateRecords(currentMapBounds, e.detail.checked);
  };

  const longPeriodToggle = (
    <>
      <IonButton onClick={showDurationOfRecordsAlert}>
        <IonIcon slot="icon-only" icon={helpCircleOutline} />
      </IonButton>
      <IonLabel className="text-black">
        <T>See past 12 months</T>
      </IonLabel>
      <IonToggle
        className="long-period-toggle"
        color="light"
        onIonChange={toggleLongPeriodReporting}
        checked={isLongPeriod}
      />
    </>
  );

  return (
    <Page id="home-map">
      <IonHeader className="ion-no-border">
        <IonToolbar color="primary">
          <IonButtons slot="end">{longPeriodToggle}</IonButtons>
        </IonToolbar>
      </IonHeader>

      <Main
        onMoveEnd={updateMapBounds}
        isFetchingRecords={isFetchingRecords}
        records={records}
      />
    </Page>
  );
};

export default observer(HomeMap);
