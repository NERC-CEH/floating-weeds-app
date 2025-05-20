import { informationCircle } from 'ionicons/icons';
import { Page, InfoMessage, Main } from '@flumens';
import { IonIcon } from '@ionic/react';
import Card from './Component/Card';
import img1 from './images/image1.jpg';
import './styles.scss';

const bgCards = [
  {
    text: '...text here...',
    image: img1,
  },
  {
    text: '...text here...',
    image: img1,
  },
  {
    text: '...text here...',
    image: img1,
  },
];

const getCards = (data: any) => {
  const showCards = (card: any) => <Card key={card.text} card={card} />;

  return data.map(showCards);
};

function Guide() {
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

        {getCards(bgCards)}
      </Main>
    </Page>
  );
}

export default Guide;
