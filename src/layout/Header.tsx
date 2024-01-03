import React from 'react';
import {
  BurgerButton,
  Button,
  MainMenu,
  FlexSpacer,
  FlexCell,
  Burger,
  FlexRow,
} from '@epam/uui';
import { AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';

export default function MainMenuBasicExample() {
  const renderBurger = (props: { onClose: () => void }) => (
    <>
      <BurgerButton
        href="/"
        caption="Training Catalog"
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
    </>
  );

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
        //render: (p) => <MainMenuLogo key={ p.id } href="https://learn.epam.com/" logoUrl="https://uui.epam.com/static/images/app-logos/learn_logo.svg" />,
        render: (p) => (
          <MainMenuLogo
            key={p.id}
            href={window.location.origin}
            logoUrl="/artograd.logo.svg"
          />
        ),
      },
      {
        id: 'flexSpacer2',
        priority: 100,
        render: (p) => <FlexSpacer key={p.id} />,
      },
      {
        id: 'signin',
        priority: 3,
        render: (p) => (
          <Button key={p.id} href="/s" caption="Sing In" fill="outline" />
        ),
      },
      {
        id: 'sign',
        priority: 2,
        render: (p) => (
          <FlexRow key={p.id} padding="6" vPadding="12" spacing="12">
            <Button color="primary" caption="Sign Up" />
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
}
