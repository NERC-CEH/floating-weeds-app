import { informationCircle } from 'ionicons/icons';
import { Page, InfoMessage, Main } from '@flumens';
import { IonIcon } from '@ionic/react';
import species from 'common/species';
import Card from './Component/Card';
import './styles.scss';

function Guide() {
  const cards = species.map((sp: any) => (
    <Card key={sp.warehouseId} species={sp} />
  ));

  return (
    <Page id="guide">
      <Main>
        <InfoMessage
          prefix={<IonIcon src={informationCircle} className="size-6" />}
          color="tertiary"
          className="m-2"
        >
          If you are still not sure after looking at this guide please submit
          the record anyway
        </InfoMessage>

        {cards}
      </Main>
    </Page>
  );
}

export default Guide;
