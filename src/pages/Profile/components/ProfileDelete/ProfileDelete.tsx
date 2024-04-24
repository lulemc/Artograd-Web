import {
  Button,
  ErrorNotification,
  FlexRow,
  Panel,
  SuccessNotification,
  Text,
  WarningAlert,
} from '@epam/uui';
import styles from './ProfileDelete.module.scss';
import { useTranslation } from 'react-i18next';
import { ReactComponent as l } from '@epam/assets/icons/common/action-deleteforever-18.svg';
import { DeleteProfileModal } from '../../modals/ProfileDeleteModal/ProfileDeleteModal';
import { useUuiContext } from '@epam/uui-core';
import { userLogin } from '../../../../store/identitySlice';
import { userApi } from '../../../../services/api/userAPI';
import { isPageLoading } from '../../../../store/helpersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { svc } from '../../../../services';
import { useHistory } from 'react-router-dom';
import {
  initialState as initialProfileState,
  resetProfile,
} from '../../../../store/slices/profileInformationSlice';
import {
  initialState as initialFundraisingState,
  resetFundraising,
} from '../../../../store/slices/profileFundrasingSlice';

export const ProfileDelete = () => {
  const { t } = useTranslation();
  const { uuiModals } = useUuiContext();
  const dispatch = useDispatch();
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const history = useHistory();
  const deleteModal = () => {
    uuiModals
      .show((props) => <DeleteProfileModal {...props} />)
      .then(() => {
        dispatch(isPageLoading(true));
        userApi
          .delete(username)
          .then(() => {
            dispatch(userLogin(false));
            dispatch(isPageLoading(false));
            dispatch(resetProfile(initialProfileState));
            dispatch(resetFundraising(initialFundraisingState));
            history.push('/home');
            svc.uuiNotifications
              .show(
                (props) => (
                  <SuccessNotification {...props}>
                    <Text>{t('profilePage.Your profile is deleted')}</Text>
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
      <Text fontSize={'18'} fontWeight={'600'}>
        {t('profilePage.Delete account')}
      </Text>
      <WarningAlert>
        <Text fontSize={'14'}>
          {t(
            'profilePage.If you delete account, your personal information and all your activity will be eliminated from the servers.',
          )}{' '}
          {t('profilePage.This action cannot be undone.')}
        </Text>
      </WarningAlert>
      <FlexRow vPadding="24">
        <Button
          fill="outline"
          color="critical"
          icon={l}
          caption={t('profilePage.Delete account')}
          onClick={deleteModal}
        />
      </FlexRow>
    </Panel>
  );
};
