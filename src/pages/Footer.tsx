import React from 'react';
import { BurgerButton, GlobalMenu, MainMenu, MainMenuAvatar, MainMenuButton, MainMenuIcon, FlexSpacer, FlexCell, DropdownMenuButton, DropdownMenuSplitter, DropdownMenuBody, Burger } from '@epam/uui';
import { Dropdown, AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';
import { ReactComponent as HelpIcon } from '@epam/assets/icons/common/notification-help-outline-24.svg';

export default function MainMenuBasicExample() {
    const renderBurger = (props: { onClose: () => void }) => (
        <>
            <BurgerButton
                href="/"
                caption="Training Catalog"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
            <BurgerButton
                href="/"
                caption="Requests"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
            <BurgerButton
                href="/"
                caption="Help"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
            <BurgerButton
                href="/"
                caption="Settings"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
            <BurgerButton
                href="/"
                caption="Log out"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
        </>
    );

    const getMenuItems = (): AdaptiveItemProps[] => {
        return [
            {
                id: 'burger', priority: 100, collapsedContainer: true, render: (p) => <Burger key={ p.id } width={ 300 } renderBurgerContent={ renderBurger } />,
            },
            {
                id: 'logo',
                priority: 99,
                render: (p) => <MainMenuLogo key={ p.id } href={window.location.origin} logoUrl="/artograd.logo.svg" />,
            },
            { id: 'flexSpacer1', priority: 100, render: (p) => <FlexSpacer key={ p.id } /> },
            { id: 'copyrights', priority: 3, render: (p) => <MainMenuButton key={ p.id } caption="© 1993—2024 EPAM Systems. All Rights Reserved." /> },
            { id: 'flexSpacer2', priority: 100, render: (p) => <FlexSpacer key={ p.id } /> },
            { id: 'privacyPolicy', priority: 3, render: (p) => <MainMenuButton key={ p.id } href="/privace_policy" caption="Privacy policy" /> },
            { id: 'coockiesPolicy', priority: 3, render: (p) => <MainMenuButton key={ p.id } href="/cookies_policy" caption="Cookies policy" /> },
        ];
    };

    return (
        <FlexCell>
            <MainMenu items={ getMenuItems() } />
        </FlexCell>
    );
}