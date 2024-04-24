import styles from './ProfileInformation.module.scss';
import {
  Button,
  FlexCell,
  FlexRow,
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
import { Trans, useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import { CityItemType } from '../../../../types';
import { useEffect, useState } from 'react';
import { getCityList } from '../../../../requests';
import { LocationInput } from './components/LocationInput/LocationInput';
import { SocialMediaSelector } from './components/SocialMediaSelector/SocialMediaSelector';
import {
  addCustomPrefix,
  createProfilePayload,
} from '../../../../services/helpers/profileHelper';
import { userApi } from '../../../../services/api/userAPI';
import { updateProfileInformation } from '../../../../store/slices/profileInformationSlice';
import { ProfileInformationItems, SocialMedia } from '../../profile.interfaces';
import { isPageLoading } from '../../../../store/helpersSlice';
import { useUuiContext } from '@epam/uui-core';
import { updateUserData } from '../../../../store/identitySlice';

export const ProfileInformation = () => {
  const svc = useUuiContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { given_name, family_name, email, socialMedia, phone_number } =
    useSelector((state: RootState) => state.profileInformation);
  const show_email = useSelector(
    (state: RootState) => state.profileInformation['custom:show_email'],
  );
  const location = useSelector(
    (state: RootState) => state.profileInformation['custom:location'],
  );
  const organization = useSelector(
    (state: RootState) => state.profileInformation['custom:organization'],
  );
  const jobtitle = useSelector(
    (state: RootState) => state.profileInformation['custom:jobtitle'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');
  const isArtist = userRoles?.includes('Artists');
  const { lens, save } = useForm({
    value: {
      given_name,
      family_name,
      organization,
      jobtitle,
      location,
      email,
      show_email,
      socialMedia,
      phone_number,
    },
    onSave: (profileInf: ProfileInformationItems) => {
      dispatch(isPageLoading(true));
      return userApi
        .put(username, createProfilePayload(profileInf))
        .then(() => {
          return Promise.resolve({ form: profileInf });
        })
        .catch(() => {
          dispatch(isPageLoading(false));
          return Promise.reject();
        });
    },
    onSuccess: (formData) => {
      dispatch(updateProfileInformation(addCustomPrefix(formData)));
      dispatch(updateUserData(addCustomPrefix(formData)));
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
        given_name: { isRequired: true },
        family_name: { isRequired: true },
        organization: { isRequired: isOfficer },
        jobtitle: { isRequired: isOfficer },
        location: { isRequired: false },
        email: { isRequired: false, isReadonly: true },
        show_email: { isRequired: false },
        phone_number: {
          isRequired: isArtist,
          validators: [
            (value) => [
              isArtist
                ? !/^\+\d{5,}$/.test(value) &&
                  t(
                    'profilePage.Invalid phone number. Number has to start from + and contain at least 5 digits',
                  )
                : isArtist,
            ],
          ],
        },
      },
    }),
    settingsKey: 'profile-information',
  });

  const [locationList, setLocationList] = useState<CityItemType[]>([]);
  const [loc, setLoc] = useState<CityItemType>();

  useEffect(() => {
    getCityList()
      .then((response) => {
        setLocationList(response);
        setLoc(getCityById(response, location));
      })
      .catch(() => null);
  }, []);
  const getCityById = (locationList: CityItemType[], city?: string) => {
    return locationList.find((cityArray) => cityArray.id === city);
  };
  const locationSelection = (data: string) => {
    lens.update((current) => {
      return { ...current, location: data };
    });
  };
  const socialMediaSelection = (data: SocialMedia[]) => {
    const fields = data?.filter((item) => item.id);
    lens.update((current) => {
      return { ...current, socialMedia: fields };
    });
  };

  return (
    <Panel cx={styles.wrapper} shadow>
      <Text fontSize={'18'} fontWeight={'600'}>
        {t('profilePage.Basic Information')}
      </Text>
      <FlexRow vPadding="12" cx={styles.row}>
        <FlexCell width="100%" grow={1}>
          <LabeledInput
            label={t('profilePage.First Name')}
            {...lens.prop('given_name').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.First Name')}
              {...lens.prop('given_name').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="100%" cx={styles.lastName} grow={1}>
          <LabeledInput
            label={t('profilePage.Last Name')}
            {...lens.prop('family_name').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.Last Name')}
              {...lens.prop('family_name').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell grow={1}>
          <LabeledInput
            label={t('profilePage.Organization')}
            sidenote={
              !isOfficer && (
                <Trans
                  components={{
                    i: <span className={styles.sideNote} />,
                  }}
                  i18nKey="optionalSidenote"
                />
              )
            }
            {...lens.prop('organization').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.Organization')}
              {...lens.prop('organization').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell grow={1}>
          <LabeledInput
            label={t('profilePage.Job Title')}
            sidenote={
              !isOfficer && (
                <Trans
                  components={{
                    i: <span className={styles.sideNote} />,
                  }}
                  i18nKey="optionalSidenote"
                />
              )
            }
            {...lens.prop('jobtitle').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.Job Title')}
              {...lens.prop('jobtitle').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding={'12'}>
        <LocationInput
          data={locationList}
          selectedLocation={loc}
          updateLocation={locationSelection}
        ></LocationInput>
      </FlexRow>
      <FlexRow vPadding={'12'}>
        <Text fontSize={'18'} fontWeight={'600'}>
          {t('profilePage.Contact Information')}
        </Text>
      </FlexRow>
      <FlexRow>
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('profilePage.Work Email')}
            {...lens.prop('email').toProps()}
          >
            <TextInput
              placeholder={t('profilePage.Work Email')}
              {...lens.prop('email').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      {isOfficer && (
        <FlexRow vPadding={'12'}>
          <FlexCell width="auto" grow={1}>
            <Alert color="warning">
              <Text fontSize={'12'}>
                <LabeledInput>
                  <Checkbox
                    {...lens.prop('show_email').toProps()}
                    label={t(
                      'profilePage.Show my email as means of contact in the tender description.',
                    )}
                  />
                </LabeledInput>
              </Text>
            </Alert>
          </FlexCell>
        </FlexRow>
      )}
      {isArtist && (
        <FlexRow vPadding={'12'}>
          <FlexCell width="auto" grow={1}>
            <LabeledInput
              label={t('profilePage.Phone')}
              {...lens.prop('phone_number').toProps()}
            >
              <TextInput
                placeholder="+382 11 11 11"
                {...lens.prop('phone_number').toProps()}
              />
            </LabeledInput>
          </FlexCell>
        </FlexRow>
      )}
      <FlexRow vPadding={'24'}>
        <FlexCell width="auto" grow={1}>
          <FlexRow>
            <Text fontSize={'18'} fontWeight={'600'}>
              {t('profilePage.Additional Links')}
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize={'14'}>
              {t(
                'profilePage.Add links to your portfolio to help people know your work profile better.',
              )}
            </Text>
          </FlexRow>
          <FlexRow>
            <SocialMediaSelector
              initData={socialMedia}
              socialMediaSelection={socialMediaSelection}
            ></SocialMediaSelector>
          </FlexRow>
        </FlexCell>
      </FlexRow>
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
