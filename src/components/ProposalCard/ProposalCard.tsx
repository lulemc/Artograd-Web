import { Badge, Button, FlexCell, FlexRow, Panel, Text } from '@epam/uui';
import dayjs from 'dayjs';
import Thumb from '../../images/proposalThumb.png';
import styles from './ProposalCard.module.scss';
import { Proposals, TenderStatus } from '../../types';
import { ReactComponent as ThumbUpIcon } from '@epam/assets/icons/common/social-thumb-up-12.svg';
import { useTranslation } from 'react-i18next';
import { DeviceType, useMediaQuery } from '../../utils/useMediaQuery';
import { AuthorCard } from '../AuthorCard/AuthorCard';
import { ReactComponent as LikeIcon } from '@epam/assets/icons/communication-thumb_up-fill.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const ProposalCard = ({
  proposal,
  tenderStatus,
  mostLiked,
  likesEnabled = false,
}: {
  proposal: Proposals;
  tenderStatus?: TenderStatus;
  mostLiked?: boolean;
  likesEnabled?: boolean;
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(DeviceType.mobile);
  const userId = useSelector((state: RootState) => state.identity.userData.sub);
  const { isLoggedIn } = useSelector((state: RootState) => state.identity);
  const likedByUser = proposal.likedByUsers.some((user) => user === userId);
  console.log(':::proposals', proposal);
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
        {likesEnabled && isLoggedIn && tenderStatus === TenderStatus.VOTING && (
          <Panel cx={styles.likeButton}>
            <Button
              icon={LikeIcon}
              color="secondary"
              fill="outline"
              caption={proposal.likedByUsers.length}
              size="24"
              onClick={() => null}
              cx={likedByUser ? styles.liked : ''}
            />
          </Panel>
        )}
      </FlexCell>
    </FlexRow>
  );
};
