import { Header, Page, Main, Section } from '@flumens';
import logo from 'common/images/flumens.svg';

const { P, H } = Section;

export default () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main>
      <Section>
        <P>
          The project would like to thank UKCEH, KMFRI and USACE for their
          advice and guidance during the development of the app.
        </P>
      </Section>

      <Section>
        <H>We are grateful to all the people that helped to create this app:</H>
        <P>
          <ul className="ml-5 list-disc pl-4">
            <li>Kate Randall (UKCEH)</li>
            <li>Gemma Nash (UKCEH)</li>
            <li>Linda May (UKCEH)</li>
            <li>France Gerard (UKCEH)</li>
            <li>Emma Tebbs (KCL)</li>
            <li>Winnifred Owoko (KCL)</li>
            <li>Karolis Kazlauskis (Flumens)</li>
          </ul>
        </P>
      </Section>

      <Section>
        <P>
          Home photo by{' '}
          <a href="https://unsplash.com/@devraj97?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            DEBRAJ PURKAYASTHA
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/a-small-white-flower-sitting-in-the-middle-of-a-swamp-IKk5OCBw5Lc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </P>
      </Section>

      <Section>
        <P>
          <p>
            <a href="https://flumens.io">
              <img src={logo} alt="" className="m-auto block w-1/2 max-w-xs" />
            </a>
          </p>
          This app was hand crafted with love by{' '}
          <a href="https://flumens.io" className="whitespace-nowrap">
            Flumens.
          </a>{' '}
          A technical consultancy that excels at building bespoke environmental
          science and community focussed solutions. For suggestions and feedback
          please do not hesitate to{' '}
          <a href="mailto:enquiries%40flumens.io?subject=App%20Feedback">
            contact us
          </a>
          .
        </P>
      </Section>
    </Main>
  </Page>
);
