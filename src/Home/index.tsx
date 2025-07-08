import { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  homeOutline,
  mapOutline,
  layersOutline,
  menuOutline,
  pricetagsOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Route, Redirect } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import { useAlert } from 'common/flumens';
import appModel from 'common/models/app';
import Guide from './Guide';
import Home from './Home';
import MapComponent from './Map';
import Menu from './Menu';
import PendingSurveysBadge from './PendingSurveysBadge';
import UserSurveys from './UserSurveys';
import './styles.scss';

function useLanguageTip() {
  const alert = useAlert();

  const showLanguageTip = () => {
    if (!appModel.data.showLanguageTip) return;

    const hideTip = () => {
      appModel.data.showLanguageTip = false;
      appModel.save();
    };

    alert({
      message: (
        <T>
          The language will default to the language of your phone settings. If
          you want to change the language go to "Settings" in the app menu and
          select "Language".
        </T>
      ),
      buttons: [
        {
          text: 'OK, got it',
          role: 'cancel',
          cssClass: 'primary',
          handler: hideTip,
        },
      ],
    });
  };

  return showLanguageTip;
}

const HomeComponent = () => {
  const showLanguageTip = useLanguageTip();
  useEffect(showLanguageTip, []);

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/landing" />
          <Route path="/home/landing" component={Home} exact />
          <Route path="/home/map" component={MapComponent} exact />
          <Route path="/home/guide" component={Guide} exact />
          <Route path="/home/surveys/:id?" component={UserSurveys} exact />
          <Route path="/home/menu" component={Menu} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="home-tab-bar">
          <IonTabButton tab="/home/landing" href="/home/landing">
            <IonIcon icon={homeOutline} />
          </IonTabButton>

          <IonTabButton tab="home/map " href="/home/map">
            <IonIcon icon={mapOutline} />
          </IonTabButton>

          <IonTabButton tab="/home/surveys" href="/home/surveys">
            <IonIcon icon={layersOutline} />
            <PendingSurveysBadge className="absolute bottom-4 right-[calc(50%_-_15px)]" />
          </IonTabButton>

          <IonTabButton tab="/home/guide" href="/home/guide">
            <IonIcon icon={pricetagsOutline} />
          </IonTabButton>

          <IonTabButton tab="menu" href="/home/menu">
            <IonIcon icon={menuOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default observer(HomeComponent);
