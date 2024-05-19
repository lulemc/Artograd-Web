import { Badge, FlexCell, FlexRow, Text } from '@epam/uui';
import dayjs from 'dayjs';
import Thumb from '../../images/proposalThumb.png';
import styles from './ProposalCard.module.scss';
import { Proposals } from '../../types';
import { ReactComponent as ThumbUpIcon } from '@epam/assets/icons/common/social-thumb-up-12.svg';
import { useTranslation } from 'react-i18next';
import { DeviceType, useMediaQuery } from '../../utils/useMediaQuery';
import { AuthorCard } from '../AuthorCard/AuthorCard';

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
        <AuthorCard
          namePrefix={t('tendersPages.tenders.tenderCard.proposals.by')}
          organization={proposal.ownerOrg}
          authorName={proposal.ownerName}
          authorPicture={proposal.ownerPicture}
        />
      </FlexCell>
    </FlexRow>
  );
};
