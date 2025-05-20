import { useEffect, useContext } from 'react';
import { Trans as T } from 'react-i18next';
import { useAlert } from '@flumens';
import { NavContext } from '@ionic/react';
import samples from 'common/models/collections/samples';
import appModel from 'models/app';
import Sample from 'models/sample';
import { Survey } from './Survey';

type SurveyDraftKeys = any;

async function showDraftAlert(alert: any) {
  const showDraftDialog = (resolve: any) => {
    alert({
      header: 'Draft',
      message: (
        <T>Previous record draft exists, would you like to continue it?</T>
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          cssClass: 'primary',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  };
  return new Promise(showDraftDialog);
}

async function getDraft(draftIdKey: keyof SurveyDraftKeys, alert: any) {
  const draftID = (appModel as any).data[draftIdKey];
  if (draftID) {
    const draftById = ({ cid }: Sample) => cid === draftID;
    const draftSample = samples.find(draftById);
    if (draftSample && !draftSample.isDisabled) {
      const continueDraftRecord = await showDraftAlert(alert);
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

async function getNewSample(survey: Survey, draftIdKey: keyof SurveyDraftKeys) {
  const sample = await survey.create!({ Sample });
  await sample.save();

  samples.push(sample);

  (appModel as any).data[draftIdKey] = sample.cid;

  return sample;
}

type Props = {
  survey: Survey;
};

function StartNewSurvey({ survey }: Props) {
  const context = useContext(NavContext);
  const alert = useAlert();

  const baseURL = `/survey`;
  const draftIdKey = `draftId:${survey.name}`;

  const pickDraftOrCreateSampleWrap = () => {
    // eslint-disable-next-line
    (async () => {
      let sample = await getDraft(draftIdKey, alert);

      if (!sample) {
        sample = await getNewSample(survey, draftIdKey);
      }

      context.navigate(`${baseURL}/${sample.cid}`, 'forward', 'replace');
    })();
  };
  useEffect(pickDraftOrCreateSampleWrap, []);

  return null;
}

// eslint-disable-next-line @getify/proper-arrows/name
StartNewSurvey.with = (survey: Survey) => {
  const StartNewSurveyWithRouter = (params: any) => (
    <StartNewSurvey survey={survey} {...params} />
  );
  return StartNewSurveyWithRouter;
};

export default StartNewSurvey;
