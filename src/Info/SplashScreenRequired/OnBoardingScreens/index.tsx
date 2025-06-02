import { ReactNode } from 'react';
import { arrowForward } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Page } from '@flumens';
import {
  IonButton,
  IonIcon,
  IonButtons,
  IonToolbar,
  IonFooter,
} from '@ionic/react';
import '@ionic/react/css/ionic-swiper.css';
import firstBackgroundImage from './images/first.jpg';
import './styles.scss';

// Fixes iOS 12 scrolling issue.
type MainProps = { children: ReactNode };
const Main = ({ children }: MainProps) => <div>{children}</div>;

type Props = {
  onExit: any;
};

const OnboardingScreens = ({ onExit }: Props) => {
  return (
    <Page id="welcome-page">
      <Main>
        <Swiper>
          <SwiperSlide
            className="first"
            style={{ backgroundImage: `url(${firstBackgroundImage})` }}
          >
            <div className="message-container blurry">
              <div className="message-header">
                <h2>
                  <T>Welcome to Floating Weeds!</T>
                </h2>
              </div>

              <p>
                <T>
                  Floating weeds choke waterways and damage ecosystems. With the
                  Floating Weeds app, your sightings help guide real-world
                  solutions and satellite-based monitoring.
                </T>
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </Main>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onExit}>
              <IonIcon icon={arrowForward} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </Page>
  );
};

export default OnboardingScreens;
