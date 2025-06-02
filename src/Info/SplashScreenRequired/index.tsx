import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import appModel from 'models/app';
import OnboardingScreens from './OnBoardingScreens';

interface Props {
  children: ReactNode;
}

const onBoardingScreens = ({ children }: Props) => {
  const { showedWelcome } = appModel.data;

  if (showedWelcome) {
    return <>{children}</>;
  }

  function onExit() {
    // eslint-disable-next-line no-param-reassign
    appModel.data.showedWelcome = true;
    appModel.save();
  }

  return <OnboardingScreens onExit={onExit} />;
};

export default observer(onBoardingScreens);
