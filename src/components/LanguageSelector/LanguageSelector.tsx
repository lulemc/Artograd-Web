import {
  FlexRow,
  DropdownMenuBody,
  DropdownMenuButton,
  MainMenuButton,
} from '@epam/uui';
import { Dropdown } from '@epam/uui-components';
import { DropdownBodyProps } from '@epam/uui-core';
import styles from './LanguageSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { userApi } from '../../services/api/userAPI';
import { createProfilePayload } from '../../services/helpers/profileHelper';
import { LanguagePrefered } from '../../pages/Profile/profile.interfaces';

const languageList = [
  {
    code: 'en',
    label: 'english',
  },
  {
    code: 'ru',
    label: 'Русский',
  },
];

const storedLanguage = localStorage.getItem('i18nextLng');
export const saveLanguagePreferences = (
  username: string,
  param: LanguagePrefered,
) => {
  userApi
    .put(username, createProfilePayload(param))
    .catch(() => console.error('Lang save is failed'));
};

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(
    storedLanguage ?? i18n.language ?? 'en',
  );
  const getLabel =
    languageList.filter((language) => language.code === selectedLanguage)[0] ??
    languageList[0];

  const { isLoggedIn } = useSelector((state: RootState) => state.identity);
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  const changeLanguageHandler = (
    language: string,
    props: { onClose?: () => void },
  ) => {
    i18n.changeLanguage(language);
    isLoggedIn && saveLanguagePreferences(username, { lang_iso2: language });
    props.onClose;
    props.onClose?.();
  };

  i18n.on('languageChanged', (language) => {
    setSelectedLanguage(language);
  });

  return (
    <Dropdown
      key="language-selector"
      renderTarget={(props: DropdownBodyProps) => (
        <FlexRow padding="6" vPadding="12" columnGap="12">
          <MainMenuButton
            caption={getLabel.code ?? 'en'}
            {...props}
            cx={styles.languageSelector}
          />
        </FlexRow>
      )}
      renderBody={(props) => (
        <DropdownMenuBody {...props}>
          {languageList.map((language) => (
            <DropdownMenuButton
              key={language.code}
              caption={language.label}
              cx={styles.languageSelectorItem}
              onClick={() => changeLanguageHandler(language.code, props)}
            />
          ))}
        </DropdownMenuBody>
      )}
      placement="bottom-end"
    />
  );
};
