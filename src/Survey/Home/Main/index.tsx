import { observer } from 'mobx-react';
import {
  bicycleOutline,
  locationOutline,
  informationCircle,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import {
  Main,
  Block,
  MenuAttrItemFromModel,
  MenuAttrItem,
  InfoMessage,
  Button,
} from '@flumens';
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
} from '@ionic/react';
import InfoBackgroundMessage from 'common/Components/InfoBackgroundMessage';
import Occurrence from 'common/models/occurrence';
import Sample from 'models/sample';
import {
  activitiesAttr,
  activitiesGroupAttr,
  commentAttr,
  userActivitiesAttr,
} from 'Survey/config';
import GridRefValue from '../../Components/GridRefValue';
import PhotoPicker from '../../Components/PhotoPicker';
import './styles.scss';

type Props = {
  sample: Sample;
  onAddSpecies: any;
};

const SurveyMain = ({ sample, onAddSpecies }: Props) => {
  const isDisabled = sample.isUploaded;
  const match = useRouteMatch();

  const activities: any = [
    ...(sample.data[activitiesAttr.id] || []),
    ...(sample.data[userActivitiesAttr.id]! || []),
  ];

  const prettyGridRef = <GridRefValue sample={sample} />;

  const getItem = (occ: Occurrence) => {
    const onDeleteWrap = () => occ.destroy();

    return (
      <IonItemSliding disabled={isDisabled} key={occ.cid}>
        <IonItem
          routerLink={`${match.url}/species/${occ.cid}`}
          className="border-b [--inner-padding-end:8px] [--padding-start:3px]"
        >
          <div className="flex w-full items-center gap-2 px-1">
            <div className="flex w-full flex-col overflow-hidden p-1">
              <div className="font-semibold">{occ.data.taxon?.commonName}</div>
              <div className="italic">{occ.data.taxon?.scientificName}</div>
            </div>
          </div>
        </IonItem>

        <IonItemOptions side="end">
          <IonItemOption color="danger" onClick={onDeleteWrap}>
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    );
  };

  const count = sample.occurrences.length;
  const hasSpecies = count > 0;

  return (
    <Main>
      <IonList lines="full" className="mb-8 flex flex-col gap-5">
        {/* {getVerificationMessage()} */}

        {isDisabled && (
          <InfoMessage
            prefix={<IonIcon src={informationCircle} className="size-6" />}
            color="tertiary"
            className="m-2"
          >
            This record has been uploaded and can not be edited.
          </InfoMessage>
        )}

        <div className="rounded-list">
          <PhotoPicker model={sample} />
        </div>

        <div className="rounded-list">
          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={prettyGridRef}
            icon={locationOutline}
            label="Location"
            skipValueTranslation
            disabled={isDisabled}
          />

          <MenuAttrItemFromModel attr="date" model={sample} />

          <MenuAttrItem
            routerLink={`${match.url}/${activitiesGroupAttr.id}`}
            value={activities.length}
            label="Activities"
            icon={bicycleOutline}
            skipValueTranslation
            disabled={isDisabled}
          />

          <Block
            block={commentAttr}
            record={sample.data}
            isDisabled={isDisabled}
          />
          {!isDisabled && (
            <InfoMessage inline>
              Please add any extra info about this record.
            </InfoMessage>
          )}
        </div>
      </IonList>

      {!isDisabled && (
        <Button onPress={onAddSpecies} color="primary" className="mx-auto mb-8">
          Add species
        </Button>
      )}

      {hasSpecies && (
        <IonList lines="none">
          <div className="rounded-list mb-10">
            <div className="list-divider flex w-full justify-between">
              <div>
                <T>Species</T>
              </div>

              <div>{count}</div>
            </div>
            {sample.occurrences.map(getItem)}
          </div>
        </IonList>
      )}

      {!hasSpecies && (
        <InfoBackgroundMessage>
          Your species list is empty. <br /> tap the "Add species" button to add
          one.
        </InfoBackgroundMessage>
      )}
    </Main>
  );
};

export default observer(SurveyMain);
