import {
  Avatar,
  Badge,
  Dropdown,
  DropdownContainer,
  FlexCell,
  FlexRow,
  IconButton,
  LinkButton,
  Text,
} from '@epam/uui';
import dayjs from 'dayjs';
import Thumb from '../../images/proposalThumb.png';
import { DropdownBodyProps, IDropdownToggler } from '@epam/uui-core';
import styles from './ProposalCard.module.scss';
import { Proposals } from '../../types';
import { ReactComponent as MailIcon } from '@epam/assets/icons/common/communication-mail-outline-18.svg';
import { ReactComponent as FacebookIcon } from '@epam/assets/icons/common/social-network-facebook-18.svg';
import { ReactComponent as InstagramIcon } from '@epam/assets/icons/common/social-network-instagram-18.svg';
import { ReactComponent as LinkedInIcon } from '@epam/assets/icons/common/linkedin-18.svg';
import { ReactComponent as ThumbUpIcon } from '@epam/assets/icons/common/social-thumb-up-12.svg';
import { useTranslation } from 'react-i18next';
import { DeviceType, useMediaQuery } from '../../utils/useMediaQuery';

const renderDropdownBody = (
  props: DropdownBodyProps,
  name: string,
  avatar: string,
  org: string,
) => {
  const { t } = useTranslation();
  return (
    <DropdownContainer vPadding="24" padding="18" focusLock={false} {...props}>
      <FlexRow alignItems="center" columnGap="12">
        <Avatar size="48" alt="avatar" img={avatar} />

        <FlexCell width="100%">
          <Text
            cx={styles.text}
            lineHeight="24"
            fontSize="16"
            color="primary"
            fontWeight="600"
          >
            {name}
          </Text>
        </FlexCell>
      </FlexRow>
      <FlexRow>
        <FlexCell width="auto">
          {org && (
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
          {org && <Text cx={styles.authorCardContent}>{org}</Text>}
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

const renderTarget = (props: IDropdownToggler, name: string) => {
  return (
    <FlexRow columnGap="6" size="24" {...props}>
      <LinkButton
        size="30"
        caption={<span className={styles.authorInfoLink}>{name}</span>}
      />
    </FlexRow>
  );
};

export const ProposalCard = ({
  proposal,
  mostLiked,
}: {
  proposal: Proposals;
  mostLiked?: boolean;
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(DeviceType.mobile);
  return (
    <FlexRow>
      {!isMobile && (
        <FlexCell width="auto" cx={styles.thumbnail}>
          <img src={Thumb} width="143px" />
        </FlexCell>
      )}
      <FlexCell width="auto" cx={styles.proposalDetails} alignSelf="flex-start">
        <Text cx={styles.proposalSubmissionText}>
          <span className={styles.dimmed}>
            {t('tendersPages.tenders.tenderCard.proposals.submittedOn')}
          </span>
          : {`${dayjs(proposal.createdAt).format('D MMM YYYY')}`}
        </Text>
        <Text cx={styles.proposalTitle}>
          {proposal.title}
          {mostLiked && proposal.likedByUsers.length >= 1 && (
            <Badge
              size="18"
              color="info"
              fill="outline"
              caption={t('tendersPages.tenders.tenderCard.proposals.mostLiked')}
              cx={styles.mostLikedBadge}
              icon={ThumbUpIcon}
            />
          )}
        </Text>

        <Text cx={styles.proposalDescription}>
          {`${proposal.description.substring(0, 120)}`}
          {proposal.description.length >= 121 && '...'}
        </Text>
        <Text cx={styles.proposalAuthor}>
          {proposal &&
            proposal.ownerPicture &&
            proposal.ownerPicture !== '' && (
              <img
                className={styles.smallProposalAvatar}
                src={proposal.ownerPicture}
              />
            )}
          <span>{t('tendersPages.tenders.tenderCard.proposals.by')}</span>
          <Dropdown
            renderBody={(props) =>
              renderDropdownBody(
                props,
                proposal.ownerName,
                proposal.ownerPicture,
                proposal.ownerOrg,
              )
            }
            renderTarget={(props) => renderTarget(props, proposal.ownerName)}
            closeOnMouseLeave="boundary"
          />
        </Text>
      </FlexCell>
    </FlexRow>
  );
};
