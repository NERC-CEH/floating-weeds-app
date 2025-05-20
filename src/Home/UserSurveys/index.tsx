import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { Page, Main, Badge } from '@flumens';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import samples, { getPending } from 'common/models/collections/samples';
import Sample from 'common/models/sample';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import Survey from './components/Survey';
import './styles.scss';

function byCreateTime(m1: any, m2: any) {
  const date1 = new Date(m1.createdAt);
  const date2 = new Date(m2.createdAt);
  return date2.getTime() - date1.getTime();
}

const UserSurveyComponent = () => {
  const [segment, setSegment] = useState('pending');
  const match = useRouteMatch<{ id?: string }>();

  useEffect(() => {
    match.params?.id && setSegment(match.params?.id);
  }, [match.params?.id]);

  const onSegmentClick = (e: any) => {
    const newSegment = e.detail.value;
    setSegment(newSegment);

    const basePath = match.path.split('/:id?')[0];
    const path = `${basePath}/${newSegment}`;
    window.history.replaceState(null, '', path); // https://stackoverflow.com/questions/57101831/react-router-how-do-i-update-the-url-without-causing-a-navigation-reload
  };

  const getSamplesList = (uploaded?: boolean) => {
    const byUploadStatus = (sample: Sample) =>
      uploaded ? sample.syncedAt : !sample.syncedAt;

    return samples.filter(byUploadStatus).sort(byCreateTime);
  };

  const getSurveys = (surveys: Sample[]) => {
    const getSurvey = (sample: Sample) => (
      <Survey key={sample.cid} sample={sample} />
    );
    const surveysList = surveys.map(getSurvey);

    return surveysList;
  };

  const getUploadedSurveys = () => {
    const samplesList = getSamplesList(true);

    if (!samplesList.length) {
      return <InfoBackgroundMessage>No uploaded records</InfoBackgroundMessage>;
    }
    return getSurveys(samplesList);
  };

  const getPendingSurveys = () => {
    const surveys = getSamplesList(false);
    const byMetadataSaved = (sample: Sample) => sample.metadata.saved;
    const finishedSurvey = surveys.find(byMetadataSaved);

    if (!surveys.length) {
      return (
        <InfoBackgroundMessage>
          No finished pending records.
        </InfoBackgroundMessage>
      );
    }

    if (finishedSurvey) {
      return (
        <>
          {getSurveys(surveys)}

          <InfoBackgroundMessage name="showSurveyUploadTip">
            Please do not forget to upload any pending records!
          </InfoBackgroundMessage>
        </>
      );
    }

    return (
      <>
        {getSurveys(surveys)}

        <InfoBackgroundMessage name="showSurveysDeleteTip">
          To delete any records swipe it to the left.
        </InfoBackgroundMessage>
      </>
    );
  };

  const getPendingSurveysCount = () => {
    const pendingSurveysCount = getPending().length;
    if (!pendingSurveysCount) return null;

    return (
      <Badge
        color="warning"
        skipTranslation
        size="small"
        fill="solid"
        className="mx-1"
      >
        {pendingSurveysCount}
      </Badge>
    );
  };

  const showingPending = segment === 'pending';
  const showingUploaded = segment === 'uploaded';

  return (
    <Page id="home-user-surveys">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSegment onIonChange={onSegmentClick} value={segment}>
            <IonSegmentButton value="pending">
              <div className="w-full flex-col py-1">
                <div className="line-clamp-2 text-wrap">
                  <T>Pending</T>
                </div>
                {getPendingSurveysCount()}
              </div>
            </IonSegmentButton>

            <IonSegmentButton value="uploaded">
              <div className="line-clamp-2 w-full text-wrap py-1">
                <T>Uploaded</T>
              </div>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <Main className="ion-padding">
        {showingPending && getPendingSurveys()}
        {showingUploaded && getUploadedSurveys()}
      </Main>
    </Page>
  );
};

export default observer(UserSurveyComponent);
