import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { Page, Header, useAlert, useSample } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'common/models/app';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import SurveyHeaderButton from 'Survey/Components/SurveyHeaderButton';
import LocationPanel from './LocationPanel';
import Main from './Main';

const SurveyHome = () => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch();
  const alert = useAlert();
  const { sample } = useSample<Sample>();

  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  if (!sample) return null;

  const askToVerifyLocation = () => {
    const askToVerifyLocationWrap = (resolve: any) => {
      const latitude = parseFloat(sample.data.location?.latitude || '');
      const longitude = parseFloat(sample.data.location?.longitude || '');

      alert({
        header: 'Location',
        cssClass: 'location-map',
        message: (
          <>
            <p>
              <T>Please confirm this is your correct location.</T>
            </p>
            <br />
            <LocationPanel latitude={latitude} longitude={longitude} />
          </>
        ),
        buttons: [
          {
            text: 'Incorrect',
            role: 'blue',
            cssClass: 'primary',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'Correct',
            cssClass: 'primary',
            handler: () => resolve(true),
          },
        ],
      });
    };

    return new Promise(askToVerifyLocationWrap);
  };

  const onFinish = async () => {
    const isValid = checkSampleStatus();
    if (!isValid) return;

    const isDraft = !sample.metadata.saved;
    if (isDraft) {
      const isLocationValid = await askToVerifyLocation();
      if (!isLocationValid) {
        navigate(`${match.url}/location`);
        return;
      }

      (appModel.data as any)['draftId:survey'] = null;
      await appModel.save();

      // eslint-disable-next-line no-param-reassign
      sample.metadata.saved = true;
      sample.save();
    }

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    sample.saveRemote();

    navigate(`/home/surveys`, 'root');
  };

  const onAddSpecies = async () => navigate(`${match.url}/species`);

  const isDisabled = sample.isUploaded;

  const finishButton = isDisabled ? null : (
    <SurveyHeaderButton sample={sample} onClick={onFinish} />
  );

  return (
    <Page id="survey-edit">
      <Header title="Record" rightSlot={finishButton} />
      <Main sample={sample} onAddSpecies={onAddSpecies} />
    </Page>
  );
};

export default observer(SurveyHome);
