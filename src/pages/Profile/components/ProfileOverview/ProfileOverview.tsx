import styles from './ProfileOverview.module.scss';
import {
  Avatar,
  ErrorNotification,
  FlexCell,
  FlexRow,
  LinkButton,
  Panel,
  SuccessNotification,
  Text,
} from '@epam/uui';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useUuiContext } from '@epam/uui-core';
import { ChangeProfileImageModal } from '../../modals/ChangeProfileImageModal/ChangeProfileImageModal';
import { createProfilePayload } from '../../../../services/helpers/profileHelper';
import { userApi } from '../../../../services/api/userAPI';
import {
  profileAvatarChanged,
  updateProfileInformation,
} from '../../../../store/slices/profileInformationSlice';
import { userAvatarChanged } from '../../../../store/identitySlice';
import { isPageLoading } from '../../../../store/helpersSlice';
import { svc } from '../../../../services';
import { useEffect } from 'react';
import {
  ACTIVE_TENDERS,
  OTHER_TENDERS,
  tenderApi,
} from '../../../../services/api/tenderApi';
import axios from 'axios';

export const ProfileOverview = () => {
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    axios
      .all([
        tenderApi.get(username, ACTIVE_TENDERS),
        tenderApi.get(username, OTHER_TENDERS),
      ])
      .then((response) => {
        const [activeTenders, others] = [response[0]?.data, response[1]?.data];

        dispatch(
          updateProfileInformation({
            activeTenders,
            others,
          }),
        );
      })
      .catch(() => null);
  }, []);

  const {
    picture,
    given_name,
    family_name,
    activeTenders,
    others,
    activeArtObjects,
    readyArtObjects,
  } = useSelector((state: RootState) => state.profileInformation);
  const organization = useSelector(
    (state: RootState) => state.profileInformation['custom:organization'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const { uuiModals } = useUuiContext();
  const dispatch = useDispatch();

  const modalHandler = () => {
    uuiModals
      .show<string>((props) => (
        <ChangeProfileImageModal modalProps={props} picture={picture} />
      ))
      .then((picture: string) => {
        dispatch(isPageLoading(true));
        userApi
          .put(username, createProfilePayload({ picture: picture || '' }))
          .then(() => {
            dispatch(profileAvatarChanged({ picture: picture || '' }));
            dispatch(userAvatarChanged({ picture: picture || '' }));
            dispatch(isPageLoading(false));
            svc.uuiNotifications
              .show(
                (props) => (
                  <SuccessNotification {...props}>
                    <Text>{t('profilePage.Profile is updated')}</Text>
                  </SuccessNotification>
                ),
                { duration: 2 },
              )
              .catch(() => null);
          })
          .catch(() => {
            dispatch(isPageLoading(false));
            svc.uuiNotifications
              .show(
                (props) => (
                  <ErrorNotification {...props}>
                    <Text>{t('profilePage.Error in profile saving')}</Text>
                  </ErrorNotification>
                ),
                { duration: 2 },
              )
              .catch(() => null);
          });
      })
      .catch(() => null);
  };

  return (
    <Panel cx={styles.wrapper} shadow>
      <FlexRow justifyContent={'center'}>
        <Avatar
          img={picture}
          size={'90'}
          cx={styles.avatar}
          onClick={modalHandler}
        />
      </FlexRow>
      <FlexRow>
        <Text cx={styles.profileName}>
          {given_name} {family_name}
        </Text>
      </FlexRow>
      <FlexRow>
        <Text cx={styles.profileRole}>{organization}</Text>
      </FlexRow>
      <FlexRow>
        <div className={styles.divider} />
      </FlexRow>
      <FlexRow padding="24">
        <Text cx={styles.overviewSectionName}>
          {t('profilePage.My Tenders')}
        </Text>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            cx={styles.overviewSectionItem}
            rawProps={{ 'data-testid': `active-id` }}
            onClick={() =>
              history.push({ pathname: '/tenders', state: ACTIVE_TENDERS })
            }
            caption={t('profilePage.Active tenders')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{activeTenders}</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            cx={styles.overviewSectionItem}
            rawProps={{ 'data-testid': `others-id` }}
            onClick={() =>
              history.push({ pathname: '/tenders', state: OTHER_TENDERS })
            }
            caption={t('profilePage.Others')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{others}</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow padding="24">
        <Text cx={styles.overviewSectionName}>
          {t('profilePage.My Art Objects')}
        </Text>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            cx={styles.overviewSectionItem}
            rawProps={{ 'data-testid': `active-art-id` }}
            onClick={() => history.push('/home')}
            caption={t('profilePage.Active art objects')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{activeArtObjects}</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            cx={styles.overviewSectionItem}
            rawProps={{ 'data-testid': `ready-id` }}
            onClick={() => history.push('/home')}
            caption={t('profilePage.Ready art objects')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{readyArtObjects}</Text>
        </FlexCell>
      </FlexRow>
    </Panel>
  );
};
