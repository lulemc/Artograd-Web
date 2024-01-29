import {
  BurgerButton,
  Button,
  MainMenu,
  FlexSpacer,
  FlexCell,
  Burger,
  FlexRow,
  DropdownMenuBody,
  DropdownMenuButton,
  MainMenuButton,
} from '@epam/uui';
import {
  AdaptiveItemProps,
  MainMenuLogo,
  Dropdown,
} from '@epam/uui-components';
import { DropdownBodyProps } from '@epam/uui-core';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

const languageList = [
  {
    code: 'en',
    label: 'english',
  },
  {
    code: 'ru',
    label: 'russian',
  },
];

export const Header = () => {
  const location = useLocation();

  const renderBurger = (props: { onClose: () => void }) => (
    <BurgerButton
      href="/"
      caption="Home"
      onClick={() => {
        props.onClose && props.onClose();
      }}
    />
  );

  const renderLanguageSelector = () => {
    return (
      <Dropdown
        key="lagnuage-selector"
        renderTarget={(props: DropdownBodyProps) => (
          // TODO: Add state manager and display label on the base of the selected language
          <FlexRow padding="6" vPadding="12" spacing="12">
            <MainMenuButton
              caption="en"
              {...props}
              cx={styles.languageSelector}
            />
          </FlexRow>
        )}
        renderBody={(props) => (
          <DropdownMenuBody {...props}>
            {languageList.map((language) => (
              <DropdownMenuButton
                caption={language.label}
                cx={styles.languageSelectorItem}
              />
            ))}
          </DropdownMenuBody>
        )}
        placement="bottom-end"
      />
    );
  };

  const getMenuItems = (): AdaptiveItemProps[] => {
    return [
      {
        id: 'burger',
        priority: 100,
        collapsedContainer: true,
        render: (p) => (
          <Burger key={p.id} width={300} renderBurgerContent={renderBurger} />
        ),
      },
      {
        id: 'logo',
        priority: 99,
        render: (p) => (
          <MainMenuLogo key={p.id} href="/" logoUrl="/artograd.logo.svg" />
        ),
      },
      {
        id: 'homeMenuItem',
        priority: 1,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/"
            caption="home"
            isLinkActive={location.pathname === '/'}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'tendersMenuItem',
        priority: 2,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/tenders"
            caption="tenders"
            isLinkActive={location.pathname === '/tenders'}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'proposalsMenuItem',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/proposals"
            caption="proposals"
            isLinkActive={location.pathname === '/proposals'}
            cx={styles.menuPageLink}
          />
        ),
      },
      {
        id: 'flexSpacer2',
        priority: 100,
        render: (p) => <FlexSpacer key={p.id} />,
      },
      {
        id: 'languageSelector',
        priority: 4,
        render: renderLanguageSelector,
      },
      {
        id: 'signin',
        priority: 5,
        render: (p) => (
          <FlexRow key={p.id} padding="6" vPadding="12" spacing="12">
            <Button
              key={p.id}
              href="/s"
              caption="Sign In"
              fill="none"
              color="primary"
              cx={styles.signInButton}
            />
          </FlexRow>
        ),
      },
      {
        id: 'sign',
        priority: 6,
        render: (p) => (
          <FlexRow key={p.id} padding="6" vPadding="12" spacing="12">
            <Button
              color="primary"
              caption="Sign Up"
              cx={styles.signUpButton}
            />
          </FlexRow>
        ),
      },
    ];
  };

  return (
    <FlexCell>
      <MainMenu items={getMenuItems()} />
    </FlexCell>
  );
};
