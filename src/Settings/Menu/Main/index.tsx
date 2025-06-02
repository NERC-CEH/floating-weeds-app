import { observer } from 'mobx-react';
import {
  warningOutline,
  personRemoveOutline,
  shareSocialOutline,
  cloudDownloadOutline,
  cloudUploadOutline,
  globeOutline,
} from 'ionicons/icons';
import { Main, useAlert, InfoMessage, Toggle, Select } from '@flumens';
import { IonIcon, IonList, IonItem, IonLabel, isPlatform } from '@ionic/react';
import languages from 'common/languages';
import appModel from 'common/models/app';
import './styles.scss';

function useDatabaseExportDialog(exportFn: any) {
  const alert = useAlert();

  const showDatabaseExportDialog = () => {
    alert({
      header: 'Export',
      message: (
        <>
          Are you sure you want to export the data?
          <p className="my-2 font-bold">
            This feature is intended solely for technical support and is not a
            supported method for exporting your data
          </p>
        </>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Export',
          handler: exportFn,
        },
      ],
    });
  };

  return showDatabaseExportDialog;
}

function useUserDeleteDialog(deleteUser: any) {
  const alert = useAlert();

  const showUserDeleteDialog = () => {
    alert({
      header: 'Account delete',
      skipTranslation: true,
      message: (
        <>
          Are you sure you want to delete your account?
          <InfoMessage
            color="danger"
            prefix={<IonIcon src={warningOutline} className="size-6" />}
            className="destructive-warning"
          >
            This will remove your account on the iRecord website. You will lose
            access to any records that you have previously submitted using the
            app or website.
          </InfoMessage>
        </>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: deleteUser,
        },
      ],
    });
  };

  return showUserDeleteDialog;
}

type Props = {
  deleteUser: any;
  isLoggedIn: boolean;
  onToggle: any;
  exportDatabase: any;
  importDatabase: any;
  sendAnalytics?: boolean;
};

const MenuMain = ({
  isLoggedIn,
  deleteUser,
  sendAnalytics,
  onToggle,
  exportDatabase,
  importDatabase,
}: Props) => {
  const showDatabaseExportDialog = useDatabaseExportDialog(exportDatabase);
  const showUserDeleteDialog = useUserDeleteDialog(deleteUser);

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

  // convert languages object to select options format
  const languageOptions = Object.entries(languages)
    .filter(([, value]) => typeof value === 'string') // only include direct language entries
    .map(([code, label]) => ({
      value: code,
      label: label as string, // type assertion since we filtered for strings
    }));

  return (
    <Main className="[--padding-bottom:30px]">
      <IonList lines="full">
        <div className="flex flex-col gap-3">
          <div className="rounded-list">
            <Select
              label="Language"
              prefix={<IonIcon src={globeOutline} className="size-6" />}
              options={languageOptions}
              defaultValue={appModel.data.language}
              onChange={(val: any) => onToggle('language', val)}
            />
            <Toggle
              prefix={<IonIcon src={shareSocialOutline} className="size-6" />}
              label="Share with app developers"
              defaultSelected={sendAnalytics}
              onChange={onSendAnalyticsToggle}
            />
            <InfoMessage inline>
              Share app crash data so we can make the app more reliable.
            </InfoMessage>

            <IonItem onClick={showDatabaseExportDialog}>
              <IonIcon icon={cloudDownloadOutline} size="small" slot="start" />
              Export database
            </IonItem>

            {!isPlatform('hybrid') && (
              <IonItem onClick={importDatabase}>
                <IonIcon icon={cloudUploadOutline} size="small" slot="start" />
                Import database
              </IonItem>
            )}
          </div>

          <div className="destructive-item rounded-list">
            {isLoggedIn && (
              <>
                <IonItem onClick={showUserDeleteDialog}>
                  <IonIcon
                    src={personRemoveOutline}
                    size="small"
                    slot="start"
                  />
                  <IonLabel>Delete account</IonLabel>
                </IonItem>
                <InfoMessage inline>
                  You can delete your user account from the system.
                </InfoMessage>
              </>
            )}
          </div>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuMain);
