import { Page, Main, Header, Section } from '@flumens';

const { P } = Section;

const Component: React.FC = () => (
  <Page id="about">
    <Header title="About" />
    <Main>
      <Section>
        <P>
          Floating Weeds is a Citizen Science app for reporting the presence of
          floating weeds such as water hyacinth. The records you send in help to
          target the monitoring and eradication of these weeds. You will receive
          feedback on the records you submit; this can help you learn how to
          recognise the different floating and emergent plants and look for
          patterns in their appearance.
        </P>

        <P>
          Please submit an overview photo of the waterway if applicable as well
          as submitting an image per species, location and date. We also ask you
          to confirm what general activities you, or others, are carrying out
          in, or around, the water (such as dog walking, fishing, kayaking). By
          gathering details of activities undertaken we hope to gain a better
          understanding of how floating weeds are affecting the use of
          freshwaters. For example, floating weeds can block waterways and get
          tangled in boat propellers causing damage and disruption.
        </P>

        <P>
          Your records will help us verify and improve the accuracy of our
          satellite derived floating weed maps on the{' '}
          <a href="https://www.ceh.ac.uk/data/floating-weed-manager">
            Floating Weed Manager
          </a>{' '}
          portal. Your anonymised records will also be added to the portal’s
          map.
        </P>

        <P>
          When you submit a record, it is stored within the iRecord website
          where it will be displayed to users, and examined and verified by an
          expert. Only your records are available publicly, not your contact
          details. Although records may be collated and disseminated for use in
          education, scientific research and other activities of benefit to the
          public, your contact details will not be shared.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Component;
