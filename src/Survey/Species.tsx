import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Main, Header, RadioInput } from '@flumens';
import { NavContext } from '@ionic/react';
import Occurrence, { Taxon } from 'models/occurrence';
import Sample from 'models/sample';

type Props = {
  sample: Sample;
  occurrence?: Occurrence;
};

const Species = ({ sample, occurrence }: Props) => {
  const { goBack } = useContext(NavContext);

  const onSpeciesSelected = async (value: string) => {
    const taxon: Taxon = {
      warehouseId: '644678',
      scientificName: value,
      commonName: value,
    };

    if (!occurrence) {
      const modelSurvey = sample.getSurvey();
      const newOcc: Occurrence = modelSurvey.occ!.create!({
        Occurrence,
        taxon,
      });

      sample.occurrences.push(newOcc);
      sample.save();

      // navigate(`${match.url}/${newOcc.cid}`, 'forward', 'replace');
      goBack();

      return;
    }

    Object.assign(occurrence.data, { taxon });

    sample.save();

    goBack();
  };

  return (
    <Page id="taxon-search">
      <Header title="Species" />
      <Main>
        <div className="my-5">
          <RadioInput
            options={[
              { value: 'species 1', label: 'species 1' },
              { value: 'species 2', label: 'species 2' },
            ]}
            onChange={onSpeciesSelected}
          />
        </div>
      </Main>
    </Page>
  );
};

export default observer(Species);
