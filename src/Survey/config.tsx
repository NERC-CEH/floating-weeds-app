import { calendarOutline, bicycleOutline, expandOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import { ChoiceInputT, dateFormat, GroupT, TextInputT } from '@flumens';
import { IonIcon } from '@ionic/react';
import OccurrenceClass, { Taxon } from 'common/models/occurrence';
import SampleClass from 'common/models/sample';
import { Survey, blockToAttr } from './Survey';

export const commentAttr = {
  id: 'comment',
  type: 'textInput',
  title: 'Comment',
  appearance: 'multiline',
} as const satisfies TextInputT;

const activitiesValues = [
  { title: 'Walking / Running', dataName: '10638' },
  { title: 'Dog-walking', dataName: '10639' },
  { title: 'Cycling', dataName: '10640' },
  { title: 'Birdwatching', dataName: '10641' },
  { title: 'Fishing', dataName: '10642' },
  { title: 'Swimming', dataName: '10643' },
  { title: 'Boats / Watersports', dataName: '10644' },
  { title: 'Other', dataName: '10645' },
] as const;

export const userActivitiesAttr = {
  id: 'smpAttr:1015',
  type: 'choiceInput',
  title: 'What activities were you doing?',
  multiple: true,
  prefix: (<IonIcon src={bicycleOutline} className="size-6" />) as any,
  container: 'inline',
  choices: activitiesValues,
} as const satisfies ChoiceInputT;

export const activitiesAttr = {
  id: 'smpAttr:1016',
  type: 'choiceInput',
  title: 'What activities are done at this location?',
  multiple: true,
  prefix: (<IonIcon src={bicycleOutline} className="size-6" />) as any,
  container: 'inline',
  choices: activitiesValues,
} as const satisfies ChoiceInputT;

export const activitiesGroupAttr = {
  id: 'activities',
  type: 'group',
  container: 'page',
  blocks: [userActivitiesAttr, activitiesAttr],
} as const satisfies GroupT;

const certaintyValues = [
  { title: '1', dataName: '24102' },
  { title: '2', dataName: '24103' },
  { title: '3', dataName: '24104' },
  { title: '4', dataName: '24105' },
  { title: '5', dataName: '24106' },
] as const;

export const certaintyAttr = {
  id: 'occAttr:1194',
  type: 'choiceInput',
  title: 'Certainty',
  // prefix: (<IonIcon src={bicycleOutline} className="size-6" />) as any,
  appearance: 'button',
  choices: certaintyValues,
} as const satisfies ChoiceInputT;

export const quantityAttr = {
  id: 'occAttr:1195',
  type: 'numberInput',
  title: 'Quantity',
  // prefix: (<IonIcon src={expandOutline} className="size-6" />) as any,
  suffix: 'm²',
  appearance: 'counter',
  validation: { min: 1 },
} as const;

const survey: Survey = {
  name: 'main',
  label: 'Record',
  id: 800,

  attrs: {
    location: {
      remote: {
        id: 'entered_sref',
        values(location: any, submission: any) {
          // eslint-disable-next-line
          submission.values = {
            ...submission.values,

            location_name: location.name,
            [`smpAttr:760`]: location.source,
            [`smpAttr:335`]: location.gridref,
            [`smpAttr:282`]: location.accuracy,
          };

          const lat = parseFloat(location.latitude);
          const lon = parseFloat(location.longitude);

          if (Number.isNaN(lat) || Number.isNaN(lat)) {
            return null;
          }

          return `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        },
      },
    },

    date: {
      menuProps: { parse: 'date', icon: calendarOutline },
      pageProps: {
        attrProps: {
          input: 'date',
          inputProps: { max: () => new Date() },
        },
      },
      remote: { values: (d: number) => dateFormat.format(new Date(d)) },
    },

    activities: {
      ...blockToAttr(activitiesGroupAttr).activities,
      // For backwards compatibility, remove once everyone uploads their records
      remote: {
        id: 1016,
        values(allValues: any, submission: any) {
          const reg = /^user_/;
          const getId = (val: any) => {
            const byValue = ({ value }: any) => value === val;
            return activitiesValues.find(byValue)?.dataName;
          };

          // personal
          const isPersonal = (val: any) => reg.test(val);
          submission.values[`smpAttr:1015`] = allValues // eslint-disable-line
            .filter(isPersonal)
            .map(getId);

          // others
          const isNotPersonal = (val: any) => !reg.test(val);
          const other = allValues.filter(isNotPersonal).map(getId);
          return other;
        },
      } as any,
    },
  },

  occ: {
    attrs: {
      taxon: {
        remote: {
          id: 'taxa_taxon_list_id',
          values: (taxon: Taxon) => taxon.warehouseId,
        },
      },
    },

    create({ Occurrence, taxon }) {
      return new Occurrence({
        data: { taxon },
      });
    },

    verify: (_: any, occ: OccurrenceClass) => object({}).safeParse(occ).error,
  },

  verify: (_: any, smp: SampleClass) =>
    object({
      data: object({
        date: z.string(),
        location: object(
          { latitude: z.number(), longitude: z.number() },
          { required_error: 'Please select location.' }
        ),
      }),
      occurrences: object({}).array().min(1, 'Please add at least one species'),
      media: z
        .array(object({}))
        .min(1, 'Please add at least one photo of the species'),
    }).safeParse(smp).error,

  create({ Sample }) {
    const sample = new Sample({
      data: {
        surveyId: survey.id,
        date: new Date().toISOString(),
        enteredSrefSystem: 4326,
      },
    });

    sample.startGPS();

    return sample;
  },
};

export default survey;
