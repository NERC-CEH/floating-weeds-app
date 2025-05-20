import { ComponentProps } from 'react';
import { observer } from 'mobx-react';
import { close } from 'ionicons/icons';
import { PhotoPicker, captureImage } from '@flumens';
import { IonButton, IonIcon } from '@ionic/react';
import config from 'common/config';
import Media from 'models/media';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';
import './styles.scss';

interface Props
  extends Omit<ComponentProps<typeof PhotoPicker>, 'getImage' | 'value'> {
  model: Sample | Occurrence;
  maxImages?: number;
  allowToCrop?: boolean;
}

const AppPhotoPicker = ({
  model,
  allowToCrop,
  maxImages,
  ...restProps
}: Props) => {
  const onAdd = async (shouldUseCamera: boolean) => {
    if (
      Number.isFinite(maxImages) &&
      model.media.length >= (maxImages as number)
    )
      return;

    const [image] = await captureImage({
      camera: shouldUseCamera,
    });
    if (!image) return;

    const imageModel = await Media.getImageModel(image, config.dataPath);
    model.media.push(imageModel as any);
    model.save();
  };

  const onRemove = async (media: any) => media.destroy();

  const isDisabled = model.parent && model.isDisabled;
  const maxPicsReached = !!maxImages && model.media.length >= maxImages;

  // eslint-disable-next-line react/no-unstable-nested-components
  const ImageWithCropping = ({
    media,
    onDelete,
    onClick,
  }: {
    media: Media;
    onDelete: any;
    onClick: any;
  }) => {
    return (
      <div className="img">
        {!isDisabled && (
          <IonButton fill="clear" className="delete" onClick={onDelete}>
            <IonIcon icon={close} />
          </IonButton>
        )}
        <img
          src={media.getURL()}
          onClick={onClick} // TODO: fix
        />
      </div>
    );
  };

  return (
    <PhotoPicker
      value={model.media}
      onAdd={onAdd}
      onRemove={onRemove}
      placeholderCount={1}
      Image={allowToCrop ? ImageWithCropping : undefined}
      isDisabled={isDisabled || maxPicsReached}
      {...restProps}
    />
  );
};

export default observer(AppPhotoPicker);
