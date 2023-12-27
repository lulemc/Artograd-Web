import React from 'react';
import {
  BurgerButton,
  FlexRow,
  Button,
  Panel,
  MainMenu,
  MainMenuAvatar,
  MainMenuButton,
  FlexSpacer,
  FlexCell,
  DropdownMenuButton,
  DropdownMenuSplitter,
  DropdownMenuBody,
  Burger,
} from '@epam/uui';
import {
  Dropdown,
  AdaptiveItemProps,
  MainMenuLogo,
} from '@epam/uui-components';

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
      <BurgerButton
        href="/"
        caption="Requests"
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href="/"
        caption="Help"
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href="/"
        caption="Settings"
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href="/"
        caption="Log out"
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
    </>
  );

  const renderAvatar = () => {
    return (
      <Dropdown
        key="avatar"
        renderTarget={(props) => (
          <MainMenuAvatar
            avatarUrl="https://api.dicebear.com/7.x/pixel-art/svg?seed=Coco&radius=50&backgroundColor=b6e3f4"
            isDropdown
            {...props}
          />
        )}
        renderBody={(props) => (
          <DropdownMenuBody {...props}>
            <DropdownMenuButton caption="My profile" />
            <DropdownMenuSplitter />
            <DropdownMenuButton caption="Log out" />
          </DropdownMenuBody>
        )}
        placement="bottom-end"
      />
    );
  };

  const renderSignButtons = () => {
    return (
      <div>
        <Panel>
          <FlexRow padding="6" vPadding="12" spacing="12">
            <Button color="primary" caption="Sign Up" onClick={() => null} />
          </FlexRow>
        </Panel>
      </div>
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
        //render: (p) => <MainMenuLogo key={ p.id } href="https://learn.epam.com/" logoUrl="https://uui.epam.com/static/images/app-logos/learn_logo.svg" />,
        render: (p) => (
          <MainMenuLogo
            key={p.id}
            href={window.location.origin}
            logoUrl="/artograd.logo.svg"
          />
        ),
      },
      // { id: 'logo', priority: 99, render: (p) => <MainMenuLogo key={ p.id } href={window.location.origin} icon={ LogoSvg } /> },
      {
        id: 'welcome',
        priority: 3,
        render: (p) => <MainMenuButton key={p.id} href="/" caption="Welcome" />,
      },
      {
        id: 'tendersReady',
        priority: 3,
        render: (p) => (
          <MainMenuButton key={p.id} href="/tenders" caption="Art objects" />
        ),
      },
      {
        id: 'flexSpacer1',
        priority: 100,
        render: (p) => <FlexSpacer key={p.id} />,
      },
      {
        id: 'tendersProposed',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/tenders"
            caption="For creative people"
          />
        ),
      },
      {
        id: 'tendersVoted',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/tenders"
            caption="For active citezens"
          />
        ),
      },
      {
        id: 'tendersFunding',
        priority: 3,
        render: (p) => (
          <MainMenuButton key={p.id} href="/tenders" caption="For investors" />
        ),
      },
      {
        id: 'tendersOfficers',
        priority: 3,
        render: (p) => (
          <MainMenuButton
            key={p.id}
            href="/tenders"
            caption="For state officers"
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
          <MainMenuButton key={p.id} href="/s" caption="Sing In" />
        ),
      },
      { id: 'sign', priority: 2, render: renderSignButtons },
      { id: 'avatar', priority: 2, render: renderAvatar },
    ];
  };

  return (
    <FlexCell grow={1}>
      <MainMenu items={getMenuItems()} />
    </FlexCell>
  );
}
