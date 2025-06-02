import { Model, ModelAttrs } from '@flumens';
import { mainStore } from './store';

export interface Attrs extends ModelAttrs {
  language: string;
  appSession: number;
  sendAnalytics: boolean;

  verifiedRecordsTimestamp: null | number;

  // draft survey pointers
  'draftId:survey'?: string;

  // tips
  showSurveysDeleteTip: boolean;
  showSurveyUploadTip: boolean;
  showLanguageTip: boolean;
}

const defaults: Attrs = {
  language: '',
  appSession: 0,
  sendAnalytics: true,
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,
  showLanguageTip: true,

  verifiedRecordsTimestamp: null,

  // draft survey pointers
  'draftId:survey': '',
};

export class AppModel extends Model<Attrs> {
  constructor(options: any) {
    super({ ...options, data: { ...defaults, ...options.data } });
  }

  resetDefaults() {
    return super.reset(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: mainStore });

export default appModel;
