import { useTranslation } from 'react-i18next';
import { IonCard, IonLabel } from '@ionic/react';
import './styles.scss';

type Props = {
  card: any;
};

function Card(props: Props) {
  const { t } = useTranslation();

  const { text, image } = props.card;

  return (
    <div id="card">
      <IonCard>
        <div className="card" style={{ backgroundImage: `url(${image})` }}>
          <div className="card-wrapper">
            <div className="card-blur-container">
              <IonLabel>{t(text)}</IonLabel>
            </div>
          </div>
        </div>
      </IonCard>
    </div>
  );
}

export default Card;
