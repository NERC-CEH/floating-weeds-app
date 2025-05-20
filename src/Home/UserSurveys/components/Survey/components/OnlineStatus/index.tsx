import { observer } from 'mobx-react';
import { IonSpinner } from '@ionic/react';
import { Badge } from 'common/flumens';
import Sample from 'common/models/sample';
import './styles.scss';

type Props = {
  sample: Sample;
};

const UsersSurveys = ({ sample }: Props) => {
  const { saved } = sample.metadata;

  if (!saved) return <Badge>Draft</Badge>;

  if (!sample.isSynchronising) return null;

  return <IonSpinner class="survey-status" />;
};

export default observer(UsersSurveys);
