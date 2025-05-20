import { Page, Main, Header, Section } from '@flumens';

const { P } = Section;

const Record = () => (
  <Page id="records">
    <Header title="What do we use your records for?" />
    <Main className="ion-padding">
      <Section>
        <P>
          <ul>
            <li>
              To get a better understanding of the timing and location of
              floating weeds; this helps us understand how climate change is
              affecting their growth and distribution, and helps prediction of
              future impacts.
            </li>
            <br />
            <li>
              To support environment agencies and water companies in water
              quality and floating weed risk management and prevention.
            </li>
            <br />
            <li>
              To help monitor and eradicate floating weeds more efficiently,
              helping to keep canals and waterways clear.
            </li>
          </ul>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Record;
