import { Trans as T } from 'react-i18next';
import { Page, Main } from '@flumens';
import { IonItem, IonItemGroup, IonLabel } from '@ionic/react';
import appLogo from 'common/images/logo.png';
import backgroundImage from './debraj-purkayastha-IKk5OCBw5Lc-unsplash.jpg';
import './styles.scss';

function Home() {
  return (
    <Page id="home-info">
      <Main forceOverscroll={false}>
        <div
          className="app-home-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <img className="app-logo" src={appLogo} alt="" />
          <IonItemGroup>
            <IonItem
              className="pretty-button"
              detail
              routerLink="/survey"
              routerDirection="none"
            >
              <IonLabel>
                <T>Record</T>
              </IonLabel>
            </IonItem>
          </IonItemGroup>
        </div>
      </Main>
    </Page>
  );
}

export default Home;
