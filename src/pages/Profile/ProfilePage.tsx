import { useTranslation } from 'react-i18next';
import { FlexCell, FlexRow, Panel, Text, WarningAlert } from '@epam/uui';
import styles from './ProfilePage.module.scss';
import { ProfileOverview } from './components/ProfileOverview/ProfileOverview';
import { ProfileDelete } from './components/ProfileDelete/ProfileDelete';
import { ProfileInformation } from './components/ProfileInformation/ProfileInformation';
import { ProfileFundraising } from './components/ProfileFundraising/ProfileFundraising';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const { given_name, family_name } = useSelector(
    (state: RootState) => state.identity.userData,
  );
  const company = useSelector(
    (state: RootState) => state.identity.userData['custom:organization'],
  );
  const jobTitle = useSelector(
    (state: RootState) => state.identity.userData['custom:jobtitle'],
  );
  const isOfficer = userRoles?.includes('Officials');
  const isArtist = userRoles?.includes('Artists');
  const showWarning = isOfficer
    ? !(!!given_name && !!family_name && !!company && !!jobTitle)
    : !(!!given_name && !!family_name);
  return (
    <Panel cx={styles.wrapper}>
      <FlexRow padding="12" cx={styles.mediaRow}>
        <FlexCell grow={1} cx={styles.headerCell}>
          <Text cx={styles.profileHeader}>{t('profilePage.My Profile')}</Text>
        </FlexCell>
        <FlexCell grow={3} cx={styles.headerCell}>
          {showWarning && (
            <FlexRow cx={styles.warning}>
              <WarningAlert cx={styles.warningMessage}>
                <Text fontSize={'14'}>
                  {t(
                    'profilePage.Please fill in the required fields for further usage of application',
                  )}{' '}
                  <b>
                    {isOfficer
                      ? `${t('profilePage.First Name')}, ${t(
                          'profilePage.Last Name',
                        )},
                     ${t('profilePage.Organization')}, ${t(
                          'profilePage.Job Title',
                        )}`
                      : `${t('profilePage.First Name')}, ${t(
                          'profilePage.Last Name',
                        )}`}
                    {isArtist && `, ${t('profilePage.Phone')}`}
                  </b>
                </Text>
              </WarningAlert>
            </FlexRow>
          )}
        </FlexCell>
      </FlexRow>
      <FlexRow padding="12" alignItems={'top'} cx={styles.mediaRow}>
        <FlexCell grow={1} cx={styles.cell}>
          <ProfileOverview />
        </FlexCell>
        <FlexCell alignSelf={'flex-start'} grow={3} cx={styles.cell}>
          <FlexRow>
            <ProfileInformation></ProfileInformation>
          </FlexRow>
          {(isArtist || isOfficer) && (
            <FlexRow>
              <ProfileFundraising />
            </FlexRow>
          )}
          <FlexRow>
            <ProfileDelete></ProfileDelete>
          </FlexRow>
        </FlexCell>
      </FlexRow>
    </Panel>
  );
};
