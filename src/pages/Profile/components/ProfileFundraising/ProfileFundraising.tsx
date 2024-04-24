import styles from './ProfileFundraising.module.scss';
import {
  FlexCell,
  FlexRow,
  Button,
  LabeledInput,
  Panel,
  Text,
  TextInput,
  useForm,
  Alert,
  Checkbox,
  SuccessNotification,
  ErrorNotification,
} from '@epam/uui';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ReactComponent as InfIcon } from '@epam/assets/icons/common/notification-error-fill-18.svg';
import {
  addCustomPrefix,
  createProfilePayload,
} from '../../../../services/helpers/profileHelper';
import { userApi } from '../../../../services/api/userAPI';
import { updateProfileFundraising } from '../../../../store/slices/profileFundrasingSlice';
import { ProfileFundraisingItems } from '../../profile.interfaces';
import { isPageLoading } from '../../../../store/helpersSlice';
import { svc } from '../../../../services';

export const ProfileFundraising = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bank_benefit_name = useSelector(
    (state: RootState) => state.profileFundrasing['custom:bank_benefit_name'],
  );
  const bank_benefit_bank = useSelector(
    (state: RootState) => state.profileFundrasing['custom:bank_benefit_bank'],
  );
  const bank_account = useSelector(
    (state: RootState) => state.profileFundrasing['custom:bank_account'],
  );
  const bank_use_default = useSelector(
    (state: RootState) => state.profileFundrasing['custom:bank_use_default'],
  );
  const bank_swift = useSelector(
    (state: RootState) => state.profileFundrasing['custom:bank_swift'],
  );
  const bank_iban = useSelector(
    (state: RootState) => state.profileFundrasing['custom:bank_iban'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');
  const { lens, save } = useForm({
    value: {
      bank_use_default,
      bank_benefit_name,
      bank_benefit_bank,
      bank_account,
      bank_iban,
      bank_swift,
    },
    onSave: (fundraising: ProfileFundraisingItems) => {
      dispatch(isPageLoading(true));
      return userApi
        .put(username, createProfilePayload(fundraising))
        .then(() => {
          return Promise.resolve({ form: fundraising });
        })
        .catch(() => {
          dispatch(isPageLoading(false));
          return Promise.reject();
        });
    },
    onSuccess: (data) => {
      dispatch(updateProfileFundraising(addCustomPrefix(data)));
      dispatch(isPageLoading(false));
      return svc.uuiNotifications
        .show(
          (props) => (
            <SuccessNotification {...props}>
              <Text>{t('profilePage.Profile is updated')}</Text>
            </SuccessNotification>
          ),
          { duration: 2 },
        )
        .catch(() => null);
    },
    onError: () =>
      svc.uuiNotifications
        .show(
          (props) => (
            <ErrorNotification {...props}>
              <Text>{t('profilePage.Error in profile saving')}</Text>
            </ErrorNotification>
          ),
          { duration: 2 },
        )
        .catch(() => null),
    getMetadata: () => ({
      props: {
        bank_benefit_name: { isRequired: false },
        bank_benefit_bank: { isRequired: false },
        bank_account: { isRequired: false },
        bank_use_default: { isRequired: false },
        bank_swift: { isRequired: false },
        bank_iban: { isRequired: false },
      },
    }),
    settingsKey: 'profile-fundraising',
  });
  return (
    <Panel cx={styles.wrapper} shadow>
      <Text fontSize={'18'} fontWeight={'600'}>
        {t('profilePage.Fundraising Account Data')}
      </Text>
      <FlexRow vPadding="12">
        <FlexCell width="auto" grow={1}>
          <Alert color="info" icon={InfIcon}>
            {isOfficer && (
              <Text>
                {t(
                  'profilePage.This information is required to start art objects fundraising when winning proposal is chosen and tender is closed.',
                )}
              </Text>
            )}
            {!isOfficer && (
              <Text>
                {t(
                  'profilePage.If you win the tender the following bank account will receive funds for idea implementation.',
                )}
              </Text>
            )}
          </Alert>
        </FlexCell>
      </FlexRow>
      {isOfficer && (
        <FlexRow vPadding="12">
          <FlexCell width="auto" grow={1}>
            <Text fontSize={'12'}>
              <LabeledInput>
                <Checkbox
                  {...lens.prop('bank_use_default').toProps()}
                  label={t(
                    'profilePage.Use this bank data by default for each tender fundraising.',
                  )}
                />
              </LabeledInput>
            </Text>
          </FlexCell>
        </FlexRow>
      )}
      <FlexRow vPadding="12">
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('profilePage.Beneficiary')}
            {...lens.prop('bank_benefit_name').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.Beneficiary')}
              {...lens.prop('bank_benefit_name').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell cx={styles.inputWrapper} width="auto" grow={1}>
          <LabeledInput
            label={t('profilePage.Beneficiary Bank')}
            {...lens.prop('bank_benefit_bank').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.Bank name')}
              {...lens.prop('bank_benefit_bank').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('profilePage.Account Number')}
            {...lens.prop('bank_account').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.Enter account number')}
              {...lens.prop('bank_account').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      {isOfficer && (
        <FlexRow vPadding="12">
          <FlexCell cx={styles.inputWrapper} width="auto" grow={1}>
            <LabeledInput
              label={t('profilePage.IBAN Number')}
              {...lens.prop('bank_iban').toProps()}
            >
              <TextInput
                placeholder={t('profilePage.International bank code')}
                {...lens.prop('bank_iban').toProps()}
              />
            </LabeledInput>
          </FlexCell>
          <FlexCell width="auto" grow={1}>
            <LabeledInput
              label={t('profilePage.SWIFT Code')}
              {...lens.prop('bank_swift').toProps()}
            >
              <TextInput
                placeholder={t('profilePage.Enter code')}
                {...lens.prop('bank_swift').toProps()}
              />
            </LabeledInput>
          </FlexCell>
        </FlexRow>
      )}
      <FlexRow>
        <div className={styles.divider} />
      </FlexRow>
      <FlexRow justifyContent={'end'}>
        <Button
          color="primary"
          caption={t('profilePage.Save Information')}
          onClick={save}
        />
      </FlexRow>
    </Panel>
  );
};
