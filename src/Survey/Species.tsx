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

const species = [
  {
    commonName: 'Nile cabbage',
    scientificName: 'Pistia stratiates',
    warehouseId: '644716',
  },
  {
    commonName: 'Papyrus',
    scientificName: 'Cyperus papyrus',
    warehouseId: '644714',
  },
  {
    commonName: 'Water ferns',
    scientificName: 'Azolla sp.',
    warehouseId: '644678',
  },
  {
    commonName: 'Water hyacinth',
    scientificName: 'Pontederia crassipes',
    warehouseId: '644718',
  },
  {
    commonName: 'Water Lettuce',
    scientificName: 'Pistia stratiotes',
    warehouseId: '644722',
  },
  {
    commonName: 'Watermosses',
    scientificName: 'Salvinia sp.',
    warehouseId: '644720',
  },
];

const mapSpeciesToOption = (s: any) => ({
  label: `${s.commonName} (${s.scientificName})`,
  value: s.warehouseId,
});

const Species = ({ sample, occurrence }: Props) => {
  const { goBack } = useContext(NavContext);

  const onSpeciesSelected = async (value: string) => {
    // find the selected species based on warehouseId
    const findSpecies = (s: any) => s.warehouseId === value;
    const selectedSpecies = species.find(findSpecies);

    if (!selectedSpecies) return;

    const taxon: Taxon = {
      warehouseId: value,
      scientificName: selectedSpecies.scientificName,
      commonName: selectedSpecies.commonName,
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

  const options = species.map(mapSpeciesToOption);

  return (
    <Page id="taxon-search">
      <Header title="Species" />
      <Main>
        <div className="my-5">
          <RadioInput options={options} onChange={onSpeciesSelected} />
        </div>
      </Main>
    </Page>
  );
};

export default observer(Species);
