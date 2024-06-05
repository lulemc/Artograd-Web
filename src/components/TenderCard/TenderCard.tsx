import {
  Badge,
  Button,
  Dropdown,
  DropdownMenuBody,
  DropdownMenuButton,
  FlexCell,
  FlexRow,
  FlexSpacer,
  LinkButton,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  ScrollBars,
  Text,
  SuccessNotification,
  WarningNotification,
  FileCardItem,
} from '@epam/uui';
import dayjs from 'dayjs';
import styles from './TenderCard.module.scss';
import { DropdownBodyProps } from '@epam/uui-core';
import { ReactComponent as DeleteIcon } from '@epam/assets/icons/common/action-delete-18.svg';
import { ReactComponent as MenuIcon } from '@epam/assets/icons/common/navigation-more_vert-18.svg';
import { ReactComponent as RightChevronIcon } from '@epam/assets/icons/common/navigation-chevron-right-18.svg';
import { ReactComponent as AttachmentIcon } from '@epam/assets/icons/common/file-attachment-12.svg';
import { ReactComponent as AttentionIcon } from '@epam/assets/icons/common/notification-error-outline-18.svg';
import { ReactComponent as GeoLocationIcon } from '@epam/assets/icons/common/communication-geo_tag-18.svg';
import { ReactComponent as StarIcon } from '@epam/assets/icons/common/fav-rates-star-12.svg';
import { getCategoryName } from '../../utils/getCategoryName';
import { useTranslation } from 'react-i18next';
import { LocationType, Proposals, TenderStatus } from '../../types';
import { DotIndicator } from '../DotIndicator/DotIndicator';
import { ProposalCard } from '../ProposalCard/ProposalCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useHistory } from 'react-router-dom';
import { IModal, useUuiContext } from '@epam/uui-core';
import { DeviceType, useMediaQuery } from '../../utils/useMediaQuery';

type TenderCardProps = {
  id: string;
  submissionStart?: string | null;
  submissionEnd?: string | null;
  files?: FileCardItem[];
  status?: TenderStatus;
  category?: string[];
  location?: LocationType;
  expectedDelivery?: string | null;
  title?: string;
  description?: string;
  proposals?: Proposals[];
  ownerId?: string;
  ownerName?: string;
  onTenderDelete?: () => void;
};

export const TenderCard = ({
  id,
  submissionStart,
  submissionEnd,
  files,
  status,
  category,
  location,
  expectedDelivery,
  title,
  description,
  proposals,
  ownerId,
  ownerName,
  onTenderDelete,
}: TenderCardProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const isMobile = useMediaQuery(DeviceType.mobile);
  const { uuiModals, uuiNotifications } = useUuiContext();
  const isProposalsExist = proposals?.length === 0;
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  const getTenderWinner = proposals?.find((proposal) => proposal.winner);
  const sortProposalsByLikes = (proposals ? [...proposals] : proposals)?.sort(
    (x, y) => y?.likedByUsers.length - x.likedByUsers.length,
  );
  const getTop3LikedProposal = sortProposalsByLikes?.splice(0, 3);

  const isMostLiked = (proposalId: string) => {
    return getTop3LikedProposal?.some((proposal) => proposal.id === proposalId);
  };

  const formatDate = (date?: string | null) => {
    return dayjs(date).format('D MMM YYYY');
  };

  const TenderDeleteModal = (modalProps: IModal<string>) => {
    return (
      <ModalBlocker {...modalProps}>
        <ModalWindow width="100%">
          <Panel background="surface-main">
            <ModalHeader
              title={t('tendersPages.tenders.tenderCard.tenderDeleteHeader')}
              onClose={() => modalProps.abort()}
              borderBottom
            />
            <ScrollBars hasTopShadow hasBottomShadow>
              <FlexRow padding="24">
                <FlexCell width="100%">
                  <Text fontWeight="600" fontSize="14" lineHeight="18">
                    {t('tendersPages.tenders.tenderCard.tenderDeleteTitle')}
                  </Text>
                  <Text fontWeight="400" fontSize="14" lineHeight="24">
                    {t('tendersPages.tenders.tenderCard.tenderDeleteMessage')}
                  </Text>
                </FlexCell>
              </FlexRow>
            </ScrollBars>
            <ModalFooter>
              <FlexSpacer />
              <Button
                color="secondary"
                fill="outline"
                caption={t(
                  'tendersPages.tenders.tenderCard.tenderDeleteCancelCta',
                )}
                onClick={() => modalProps.abort()}
              />
              <Button
                color="primary"
                caption={t(
                  'tendersPages.tenders.tenderCard.tenderDeleteConfirmCta',
                )}
                onClick={() => {
                  modalProps.success('Success action');
                  if (onTenderDelete) {
                    onTenderDelete();
                  }
                }}
              />
            </ModalFooter>
          </Panel>
        </ModalWindow>
      </ModalBlocker>
    );
  };

  const onTenderDeleteClick = () => {
    return uuiModals
      .show<string>((props) => <TenderDeleteModal {...props} />)
      .then(() => {
        uuiNotifications
          .show((props) => (
            <SuccessNotification {...props}>
              <FlexRow alignItems="center">
                <Text>
                  {t('tendersPages.tenders.tenderCard.tenderDeletConfirmation')}
                </Text>
              </FlexRow>
            </SuccessNotification>
          ))
          .catch(() => null);
      })
      .catch(() => {
        uuiNotifications
          .show((props) => (
            <WarningNotification {...props}>
              <FlexRow alignItems="center">
                <Text>
                  {t(
                    'tendersPages.tenders.tenderCard.tenderDeleteCancelMessage',
                  )}
                </Text>
              </FlexRow>
            </WarningNotification>
          ))
          .catch(() => null);
      });
  };

  const renderTenderOptionMenu = (
    props: DropdownBodyProps,
    ownerId?: string,
    username?: string,
  ) => {
    return (
      <DropdownMenuBody {...props} rawProps={{ style: { padding: 0 } }}>
        {ownerId === username && (
          <DropdownMenuButton
            caption={t(
              'tendersPages.tenders.tenderCard.tenderDeleteConfirmCta',
            )}
            icon={DeleteIcon}
            onClick={() => onTenderDeleteClick()}
          />
        )}
      </DropdownMenuBody>
    );
  };

  return (
    <FlexRow cx={styles.wrapper}>
      <FlexCell width="100%" cx={styles.content}>
        {isMobile ? (
          <FlexRow cx={styles.meta}>
            <FlexCell width="100%" cx={styles.flex}>
              <FlexRow justifyContent="space-between" cx={styles.metaRow}>
                <span className={styles.dimmed}>
                  {t('tendersPages.tenders.tenderCard.postedBy')}:
                </span>
                {ownerName}
              </FlexRow>
              <FlexRow justifyContent="space-between" cx={styles.metaRow}>
                <span className={styles.dimmed}>
                  {t('tendersPages.tenders.tenderCard.tenderValidityStarts')}:
                </span>
                {formatDate(submissionStart)}
              </FlexRow>
              <FlexRow justifyContent="space-between" cx={styles.metaRow}>
                <span className={styles.dimmed}>
                  {t('tendersPages.tenders.tenderCard.tenderValidityEnds')}:
                </span>
                {formatDate(submissionEnd)}
              </FlexRow>

              {expectedDelivery && (
                <FlexRow cx={styles.metaRow} justifyContent="space-between">
                  <span className={styles.dimmed}>
                    {t('tendersPages.tenders.tenderCard.readiness')}:
                  </span>
                  {formatDate(expectedDelivery)}
                </FlexRow>
              )}

              {files && files?.length >= 1 && (
                <Badge
                  size="18"
                  color="neutral"
                  fill="solid"
                  icon={AttachmentIcon}
                  caption={files?.length}
                  cx={styles.filesAmountBadge}
                />
              )}
              <FlexRow cx={styles.metaRow}>
                <DotIndicator status={status} />
                {t(`global.statuses.${status?.toLowerCase()}`)}
              </FlexRow>
            </FlexCell>
          </FlexRow>
        ) : (
          <FlexRow cx={styles.meta}>
            <FlexCell width="auto" cx={styles.flex}>
              <span className={styles.dimmed}>
                {t('tendersPages.tenders.tenderCard.postedBy')}:
              </span>
              {ownerName}
              <DotIndicator />
              <span className={styles.dimmed}>
                {t('tendersPages.tenders.tenderCard.tenderValidity')}:
              </span>
              {`
            ${formatDate(submissionStart)} - ${formatDate(submissionEnd)}`}
              {files && files?.length >= 1 && <DotIndicator />}
              {files && files?.length >= 1 && (
                <Badge
                  size="18"
                  color="neutral"
                  fill="solid"
                  icon={AttachmentIcon}
                  caption={files?.length}
                  cx={styles.filesAmountBadge}
                />
              )}
            </FlexCell>
            <FlexSpacer />
            <FlexRow cx={styles.flex}>
              {status === TenderStatus.SELECTION && ownerId === username && (
                <Button
                  icon={AttentionIcon}
                  iconPosition="left"
                  caption={t(
                    'tendersPages.tenders.tenderCard.actionRequiredCta',
                  )}
                  fill="ghost"
                  onClick={() => history.push(`/tender/${id}`)}
                  cx={styles.actionRequiredCta}
                />
              )}
              <span className={styles.flex}>
                <DotIndicator status={status} />
                {t(`global.statuses.${status?.toLowerCase()}`)}
              </span>
            </FlexRow>
          </FlexRow>
        )}
        {isMobile ? (
          <FlexRow cx={styles.meta}>
            <FlexRow cx={styles.metaRow}>
              {category &&
                category?.length >= 1 &&
                category?.map((category, index) => (
                  <Badge
                    key={index}
                    size="18"
                    color="neutral"
                    fill="solid"
                    caption={t(`${getCategoryName(category)?.name}`)}
                    cx={styles.categoryBadge}
                  />
                ))}
            </FlexRow>
            <FlexRow cx={styles.metaRow}>
              <GeoLocationIcon className={styles.geoLocationIcon} />
              {`${process.env.REACT_APP_LOCATION} ${
                location?.nestedLocation.name
                  ? `, ${location?.nestedLocation.name}`
                  : ''
              }`}
            </FlexRow>
            {status === TenderStatus.SELECTION && ownerId === username && (
              <FlexRow cx={styles.metaRow}>
                <Button
                  icon={AttentionIcon}
                  iconPosition="left"
                  caption={t(
                    'tendersPages.tenders.tenderCard.actionRequiredCta',
                  )}
                  fill="ghost"
                  onClick={() => history.push(`/tender/${id}`)}
                  cx={styles.actionRequiredCta}
                />
              </FlexRow>
            )}
          </FlexRow>
        ) : (
          <FlexRow cx={styles.meta}>
            <FlexCell width="auto" cx={styles.flex}>
              {category && category?.length >= 1 && (
                <span className={`${styles.categories} ${styles.flex}`}>
                  {category?.map((category, index) => (
                    <Badge
                      key={index}
                      size="18"
                      color="neutral"
                      fill="solid"
                      caption={t(`${getCategoryName(category)?.name}`)}
                      cx={styles.categoryBadge}
                    />
                  ))}
                </span>
              )}
              {category && category?.length >= 1 && <DotIndicator />}
              <GeoLocationIcon className={styles.geoLocationIcon} />
              {`${process.env.REACT_APP_LOCATION} ${
                location?.nestedLocation.name
                  ? `, ${location?.nestedLocation.name}`
                  : ''
              }`}
            </FlexCell>
            <FlexSpacer />
            {expectedDelivery && (
              <FlexCell width="auto">
                <span className={styles.dimmed}>
                  {t('tendersPages.tenders.tenderCard.readiness')}:
                </span>
                {formatDate(expectedDelivery)}
              </FlexCell>
            )}
          </FlexRow>
        )}
        <FlexRow
          cx={styles.title}
          onClick={() => history.push(`/tender/${id}`)}
        >
          {title}
        </FlexRow>
        <FlexRow cx={styles.description}>{description}</FlexRow>
        <FlexRow cx={styles.proposalsLabel}>
          {t('tendersPages.tenders.tenderCard.submittedProposalsLabel')}
          {proposals && !isProposalsExist && `(${proposals?.length})`}
          {proposals && !isProposalsExist && (
            <LinkButton
              icon={RightChevronIcon}
              iconPosition="right"
              caption={t(
                'tendersPages.tenders.tenderCard.viewAllSubmittedProposalsCta',
              )}
              onClick={() => history.push(`/tender/${id}`)}
              isDisabled={isProposalsExist || !proposals}
              cx={styles.viewAllCta}
            />
          )}
        </FlexRow>
        {(isProposalsExist || !proposals) &&
          status !== TenderStatus.DRAFT &&
          status !== TenderStatus.CANCELLED && (
            <FlexRow cx={styles.noProposalsInfoText}>
              {t('tendersPages.tenders.tenderCard.noSubmittedProposals')}
            </FlexRow>
          )}
        {status === TenderStatus.CLOSED && getTenderWinner && (
          <FlexRow cx={styles.noProposalsInfoText}>
            <Badge
              size="18"
              color="info"
              fill="solid"
              caption={t(
                'tendersPages.tenders.tenderCard.proposals.winnerBadge',
              )}
              icon={StarIcon}
              cx={styles.winnerBadge}
            />
            <span>{getTenderWinner?.title}</span>
            {isProposalsExist && (
              <Button
                icon={RightChevronIcon}
                iconPosition="right"
                caption={t(
                  'tendersPages.tenders.tenderCard.proposals.viewDetailsCta',
                )}
                fill="ghost"
                onClick={() => history.push(`/tender/${id}`)}
                isDisabled={isProposalsExist}
              />
            )}
          </FlexRow>
        )}
        {status !== TenderStatus.CLOSED &&
          proposals
            ?.sort((a, b) =>
              dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1,
            )
            ?.slice(0, 3)
            .map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                mostLiked={isMostLiked(proposal.id)}
              />
            ))}
      </FlexCell>
      {ownerId === username && (
        <FlexCell
          cx={styles.optionsCtaWrapper}
          width="auto"
          alignSelf="flex-start"
        >
          <Dropdown
            renderBody={(props) =>
              renderTenderOptionMenu(props, ownerId, username)
            }
            renderTarget={(props) => (
              <Button
                {...props}
                fill="ghost"
                icon={MenuIcon}
                size="36"
                isDropdown={false}
                cx={styles.optionCta}
              />
            )}
            placement="bottom-end"
          />
        </FlexCell>
      )}
    </FlexRow>
  );
};
