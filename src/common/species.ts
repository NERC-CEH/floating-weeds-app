import brazilianWaterWeed from 'common/images/species/brazilian water weed.jpg';
import hippoGrass from 'common/images/species/hippo grass.jpg';
import hornwort from 'common/images/species/hornwort.jpg';
import nileCabbage from 'common/images/species/nile cabbage.jpg';
import papyrus from 'common/images/species/papyrus.jpg';
import waterFerns from 'common/images/species/water ferns.jpg';
import waterHyacinth from 'common/images/species/water hyacinth.jpg';
import watermosses from 'common/images/species/watermosses.jpg';

export const OTHER_SPECIES_ID = '709107';

const species = [
  {
    commonName: 'Brazilian water weed',
    scientificName: 'Eugelia densa',
    warehouseId: '709104',
    image: brazilianWaterWeed,
  },
  {
    commonName: 'Hippo grass',
    scientificName: 'Vossia cuspidata',
    warehouseId: '709100',
    image: hippoGrass,
  },
  {
    commonName: 'Hornwort',
    scientificName: 'Ceratophyllum demersum',
    warehouseId: '709102',
    image: hornwort,
  },
  {
    commonName: 'Nile cabbage',
    scientificName: 'Pistia stratiates',
    warehouseId: '644716',
    image: nileCabbage,
  },
  {
    commonName: 'Papyrus',
    scientificName: 'Cyperus papyrus',
    warehouseId: '644714',
    image: papyrus,
  },
  {
    commonName: 'Water ferns',
    scientificName: 'Azolla sp.',
    warehouseId: '644678',
    image: waterFerns,
  },
  {
    commonName: 'Water hyacinth',
    scientificName: 'Pontederia crassipes',
    warehouseId: '644718',
    image: waterHyacinth,
  },
  {
    commonName: 'Watermosses',
    scientificName: 'Salvinia sp.',
    warehouseId: '644720',
    image: watermosses,
  },

  {
    commonName: 'Other',
    warehouseId: OTHER_SPECIES_ID,
  },

  {
    commonName: 'No weeds',
    warehouseId: '709106',
    className: 'mt-6',
  },
];

export default species;
