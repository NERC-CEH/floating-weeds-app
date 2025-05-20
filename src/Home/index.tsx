import { observer } from 'mobx-react';
import {
  homeOutline,
  mapOutline,
  informationCircleOutline,
  layersOutline,
  menuOutline,
} from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import Guide from './Guide';
import Home from './Home';
import MapComponent from './Map';
import Menu from './Menu';
import PendingSurveysBadge from './PendingSurveysBadge';
import UserSurveys from './UserSurveys';
import './styles.scss';

const HomeComponent = () => {
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
            <IonIcon icon={informationCircleOutline} />
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
