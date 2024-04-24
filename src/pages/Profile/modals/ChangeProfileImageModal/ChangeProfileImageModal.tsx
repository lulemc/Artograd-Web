import styles from './ChangeProfileImageModal.module.scss';
import {
  Avatar,
  Button,
  ErrorNotification,
  FlexCell,
  FlexRow,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  ScrollBars,
  Text,
} from '@epam/uui';
import { IModal, useUuiContext } from '@epam/uui-core';
import { FlexSpacer } from '@epam/uui-components';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { isPageLoading } from '../../../../store/helpersSlice';
import { svc } from '../../../../services';

const FILE_SIZE_LIMIT = 1024 * 1024 * 1;
const SUPPORTED_IMAGE_FORMATS = ['JPG', 'GIF', 'PNG'];

export function ChangeProfileImageModal({
  modalProps,
  picture,
}: {
  modalProps: IModal<string>;
  picture: string;
}) {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState<string>(picture);
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const { uuiApi } = useUuiContext();
  const dispatch = useDispatch();

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const idToken = localStorage.getItem('id_token');
    const file = e.currentTarget.files?.[0];
    const fileFormat = file?.name.split('.').pop()?.toUpperCase();
    const isSupportedFormat = SUPPORTED_IMAGE_FORMATS.includes(
      fileFormat || '',
    );
    const isInSizeLimit = file && file.size <= FILE_SIZE_LIMIT;
    if (isInSizeLimit && isSupportedFormat) {
      dispatch(isPageLoading(true));
      uuiApi
        .uploadFile(
          `${process.env.REACT_APP_BACKEND_URL}/uploadFile/pics/${username}`,
          file,
          {
            onProgress: () => null,
            getXHR: (xhr) => {
              xhr.setRequestHeader('Authorization', `Bearer ${idToken}`);
              xhr.withCredentials = false;
            },
          },
        )
        .then((res) => {
          setImgUrl(res.path || '');
          dispatch(isPageLoading(false));
        })
        .catch(() => {
          dispatch(isPageLoading(false));
          svc.uuiNotifications
            .show(
              (props) => (
                <ErrorNotification {...props}>
                  <Text>{t('profilePage.Image upload failed')}</Text>
                </ErrorNotification>
              ),
              { duration: 2 },
            )
            .catch(() => null);
        });
    } else {
      svc.uuiNotifications
        .show(
          (props) => (
            <ErrorNotification {...props}>
              {!isSupportedFormat && (
                <Text>
                  {t(
                    'profilePage.Image format is incorrect. Valid formats - JPG, GIF, or PNG',
                  )}
                </Text>
              )}
              {!isInSizeLimit && (
                <Text>
                  {t(
                    'profilePage.Image size is too big. Please upload photo for up to 1 MB',
                  )}
                </Text>
              )}
            </ErrorNotification>
          ),
          { duration: 2 },
        )
        .catch(() => null);
    }
  };

  const inputRef = createRef<HTMLInputElement>();
  const onClick = () => inputRef.current?.click();

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modalWrapper}>
        <Panel background="surface-main">
          <ModalHeader
            title={t('profilePage.Change Profile Image')}
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexRow vPadding="24" padding="24">
              <FlexCell width="auto" grow={1}>
                <Text>
                  {t(
                    'profilePage.Upload an image as you would like to represent you identity and appear in your Artograd profile',
                  )}
                </Text>
                <FlexRow>
                  <FlexCell grow={1}>
                    <Avatar
                      cx={styles.avatar}
                      alt="avatar"
                      img={imgUrl}
                      size="90"
                    />
                  </FlexCell>
                  <FlexCell grow={3}>
                    <FlexRow>
                      <Button
                        cx={styles.buttonWrapper}
                        fill="none"
                        color="primary"
                        caption={t('profilePage.Change Photo')}
                        onClick={onClick}
                      />
                      <input
                        type="file"
                        className={styles.inputImg}
                        ref={inputRef}
                        onChange={uploadFile}
                      />

                      <Button
                        fill="none"
                        color="secondary"
                        caption={t('profilePage.Remove Photo')}
                        onClick={() => setImgUrl('')}
                      />
                    </FlexRow>
                  </FlexCell>
                </FlexRow>
                <Text>
                  {t(
                    'profilePage.Supported formats JPG, GIF, or PNG. Maximum size 1 MB.',
                  )}
                </Text>
              </FlexCell>
            </FlexRow>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption={t('profilePage.Cancel')}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption={t('profilePage.Change')}
              onClick={() => modalProps.success(imgUrl)}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
