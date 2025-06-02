import { useTranslation } from 'react-i18next';
import { IonCard } from '@ionic/react';
import './styles.scss';

type Props = {
  species: any;
};

function Card({ species }: Props) {
  const { t } = useTranslation();

  const { commonName, scientificName, image } = species;

  return (
    <div id="card">
      <IonCard>
        <div className="card" style={{ backgroundImage: `url(${image})` }}>
          <div className="card-wrapper">
            <div className="card-blur-container p-3">
              <span>{t(commonName)}</span>
              <i className="px-2">({t(scientificName)})</i>
            </div>
          </div>
        </div>
      </IonCard>
    </div>
  );
}

export default Card;
