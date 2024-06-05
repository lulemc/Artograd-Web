import {
  Avatar,
  Dropdown,
  DropdownContainer,
  FlexCell,
  FlexRow,
  IconButton,
  LinkButton,
  Panel,
  Text,
} from '@epam/uui';
import styles from './AuthorCard.module.scss';
import { DropdownBodyProps, IDropdownToggler } from '@epam/uui-core';
import { ReactComponent as MailIcon } from '@epam/assets/icons/common/communication-mail-outline-18.svg';
import { ReactComponent as FacebookIcon } from '@epam/assets/icons/common/social-network-facebook-18.svg';
import { ReactComponent as InstagramIcon } from '@epam/assets/icons/common/social-network-instagram-18.svg';
import { ReactComponent as LinkedInIcon } from '@epam/assets/icons/common/linkedin-18.svg';
import { useTranslation } from 'react-i18next';

const renderDropdownBody = (
  props: DropdownBodyProps,
  authorName?: string,
  organization?: string,
  authorPicture?: string,
) => {
  const { t } = useTranslation();
  return (
    <DropdownContainer vPadding="24" padding="18" focusLock={false} {...props}>
      <FlexRow alignItems="center" columnGap="12">
        {authorPicture && <Avatar size="48" alt="avatar" img={authorPicture} />}

        <FlexCell width="100%">
          <Text
            cx={styles.text}
            lineHeight="24"
            fontSize="16"
            color="primary"
            fontWeight="600"
          >
            {authorName}
          </Text>
        </FlexCell>
      </FlexRow>
      <FlexRow>
        <FlexCell width="auto">
          {organization && (
            <Text cx={styles.authorCardLabel}>
              {t(
                'tendersPages.tenders.tenderCard.proposals.authorCard.company',
              )}
            </Text>
          )}
          <Text cx={styles.authorCardLabel}>
            {t('tendersPages.tenders.tenderCard.proposals.authorCard.jobTitle')}
          </Text>
          <Text cx={styles.authorCardLabel}>
            {t('tendersPages.tenders.tenderCard.proposals.authorCard.location')}
          </Text>
        </FlexCell>
        <FlexCell width="auto">
          {organization && (
            <Text cx={styles.authorCardContent}>{organization}</Text>
          )}
          <Text cx={styles.authorCardContent}>Art Director</Text>
          <Text cx={styles.authorCardContent}>Montenegro, Herceg Novi</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow>
        <IconButton
          cx={styles.socialIcon}
          icon={MailIcon}
          onClick={() => null}
        />
        <IconButton
          cx={styles.socialIcon}
          icon={FacebookIcon}
          onClick={() => null}
        />
        <IconButton
          cx={styles.socialIcon}
          icon={InstagramIcon}
          onClick={() => null}
        />
        <IconButton
          cx={styles.socialIcon}
          icon={LinkedInIcon}
          onClick={() => null}
        />
      </FlexRow>
    </DropdownContainer>
  );
};

const renderTarget = (props: IDropdownToggler, name?: string) => {
  return (
    <FlexRow columnGap="6" size="24" {...props}>
      <LinkButton
        size="30"
        caption={<span className={styles.authorInfoLink}>{name}</span>}
      />
    </FlexRow>
  );
};

export const AuthorCard = ({
  organization,
  authorName,
  authorPicture,
  namePrefix,
}: {
  organization?: string;
  authorName?: string;
  authorPicture?: string;
  namePrefix?: string;
}) => {
  return (
    <Panel>
      <Text cx={styles.proposalAuthor}>
        {authorPicture && authorPicture !== '' && (
          <Avatar
            size="36"
            alt="avatar"
            img={authorPicture}
            cx={styles.smallProposalAvatar}
          />
        )}
        {namePrefix && <span>{namePrefix}</span>}
        <Dropdown
          renderBody={(props) =>
            renderDropdownBody(props, authorName, organization, authorPicture)
          }
          renderTarget={(props) => renderTarget(props, authorName)}
          closeOnMouseLeave="boundary"
        />
      </Text>
    </Panel>
  );
};
