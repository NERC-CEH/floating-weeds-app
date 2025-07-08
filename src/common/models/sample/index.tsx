import { IObservableArray } from 'mobx';
import { useTranslation } from 'react-i18next';
import {
  device,
  useAlert,
  Sample as SampleOriginal,
  SampleAttrs,
  SampleOptions,
  SampleMetadata,
  ModelValidationMessage,
  ChoiceValues,
} from '@flumens';
import config from 'common/config';
import userModel from 'models/user';
import surveyConfig, {
  activitiesAttr,
  userActivitiesAttr,
} from 'Survey/config';
import Media from '../media';
import Occurrence from '../occurrence';
import { samplesStore } from '../store';
import GPSExtension from './GPSExt';

type Attrs = SampleAttrs & {
  date?: any;
  location?: any;

  [activitiesAttr.id]?: ChoiceValues<typeof activitiesAttr.choices>[];
  [userActivitiesAttr.id]?: ChoiceValues<typeof userActivitiesAttr.choices>[];
};

type Metadata = SampleMetadata & {
  saved?: boolean;
};

export default class Sample extends SampleOriginal<Attrs, Metadata> {
  declare occurrences: IObservableArray<Occurrence>;

  declare samples: IObservableArray<Sample>;

  declare media: IObservableArray<Media>;

  declare survey: any;

  declare toggleGPStracking: any;

  startGPS: any; // from extension

  isGPSRunning: any; // from extension

  stopGPS: any; // from extension

  constructor(options: SampleOptions<Attrs>) {
    super({ ...options, Occurrence, Media, store: samplesStore });

    this.remote.url = config.backend.indicia.url;
    this.remote.getAccessToken = () => userModel.getAccessToken();

    Object.assign(this, GPSExtension());
    this.survey = surveyConfig;
  }

  destroy(silent?: boolean) {
    this.cleanUp();
    return super.destroy(silent);
  }

  cleanUp() {
    return this.stopGPS();
  }

  getSurvey() {
    return this.survey;
  }

  async upload() {
    if (this.remote.synchronising || this.isUploaded) return true;

    const invalids = this.validateRemote();
    if (invalids) return false;

    if (!device.isOnline) return false;

    this.cleanUp();
    await this.saveRemote();

    return true;
  }
}

export const useValidateCheck = (model?: Sample | Occurrence) => {
  const alert = useAlert();
  const { t } = useTranslation();

  const showValidateCheck = () => {
    const invalids = model?.validateRemote();
    if (invalids) {
      alert({
        header: t('Incomplete'),
        skipTranslation: true,
        message: <ModelValidationMessage {...invalids} />,
        buttons: [
          {
            text: t('Got it'),
            role: 'cancel',
          },
        ],
      });
      return false;
    }
    return true;
  };

  return showValidateCheck;
};
