import {
  Button,
  FileCard,
  FlexCell,
  FlexRow,
  FlexSpacer,
  HintAlert,
  Panel,
  TabButton,
  Text,
  TextPlaceholder,
  WarningAlert,
} from '@epam/uui';
import styles from './TenderPage.module.scss';
import { useTranslation } from 'react-i18next';
import { tendersApi } from '../../services/api/tendersApi';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tender, TenderStatus } from '../../types';
import { DotIndicator } from '../../components/DotIndicator/DotIndicator';
import { getCategoryName } from '../../utils/getCategoryName';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { MapCordsController } from '../../components/MapCordsController/MapCordsController';
import dayjs from 'dayjs';
import { ReactComponent as NavigationChevronRightOutlineIcon } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { AuthorCard } from '../../components/AuthorCard/AuthorCard';
import { ProposalCard } from '../../components/ProposalCard/ProposalCard';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import SearchGuyIcon from '../../images/searchGuy.svg';
import { useUuiContext } from '@epam/uui-core';
import { TenderDialogModals } from '../../components/DialogModals/TenderDialogModals';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type TenderRouteParams = {
  tenderId: string;
};

export const TenderPage = () => {
  const { t } = useTranslation();
  const { uuiModals } = useUuiContext();
  const { tenderId } = useParams<TenderRouteParams>();
  const [tenderDetails, setTenderDetails] = useState<Tender | undefined>();
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState('tender');
  const proposals = tenderDetails?.proposals;
  const tenderStatus = tenderDetails?.status;
  const tenderOwner = username === tenderDetails?.ownerId;

  useEffect(() => {
    setIsLoading(true);
    tendersApi
      .get(undefined, undefined, undefined, undefined, undefined, tenderId)
      .then((response) => {
        setTenderDetails(response);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const sortProposalsByLikes = (proposals ? [...proposals] : proposals)?.sort(
    (x, y) => y?.likedByUsers.length - x.likedByUsers.length,
  );
  const getTop3LikedProposal = sortProposalsByLikes?.splice(0, 3);

  const isMostLiked = (proposalId: string) => {
    return getTop3LikedProposal?.some((proposal) => proposal.id === proposalId);
  };

  return (
    <Panel cx={styles.wrapper}>
      <FlexRow>
        <FlexCell width="100%">
          <Text cx={styles.pageTitle}>
            {isLoading ? (
              <TextPlaceholder wordsCount={3}>Text</TextPlaceholder>
            ) : (
              tenderDetails?.title
            )}
          </Text>
        </FlexCell>
        <FlexSpacer />
        <FlexCell width="100%" textAlign="right">
          {tenderDetails && tenderDetails?.status && (
            <Text fontSize="14" fontWeight="400">
              <DotIndicator status={tenderDetails?.status} />
              {t(`global.statuses.${tenderDetails?.status.toLowerCase()}`)}
            </Text>
          )}
        </FlexCell>
      </FlexRow>
      <FlexRow borderBottom>
        <FlexRow>
          <TabButton
            caption={t(`tendersPages.viewTender.tenderTab`)}
            isLinkActive={tab === 'tender'}
            onClick={() => setTab('tender')}
            size="48"
          />
          <TabButton
            caption={t(`tendersPages.viewTender.proposalsTab`)}
            isLinkActive={tab === 'proposals'}
            onClick={() => setTab('proposals')}
            count={proposals ? proposals.length : 0}
            size="48"
          />
        </FlexRow>
        <FlexSpacer />
        <FlexRow>
          {tenderDetails && tenderStatus === TenderStatus.CLOSED && (
            <Button
              icon={NavigationChevronRightOutlineIcon}
              iconPosition="right"
              caption={t(`tendersPages.viewTender.openArtObjectCta`)}
              fill="ghost"
              onClick={() => null}
            />
          )}
          {tenderDetails &&
            tenderOwner &&
            tenderStatus !== TenderStatus.CANCELLED &&
            tenderStatus !== TenderStatus.CLOSED && (
              <Button
                fill="ghost"
                color="secondary"
                caption={t(`tendersPages.viewTender.cancelTenderCta`)}
                onClick={() =>
                  uuiModals
                    .show<string>((props) => (
                      <TenderDialogModals
                        modalProps={props}
                        modalType="cancel"
                        tender={tenderDetails}
                      />
                    ))
                    .catch(() => null)
                }
              />
            )}
          {tenderDetails &&
            tenderOwner &&
            tenderStatus === TenderStatus.CANCELLED && (
              <Button
                fill="ghost"
                color="secondary"
                caption={t(`tendersPages.viewTender.deleteTenderCta`)}
                onClick={() =>
                  uuiModals
                    .show<string>((props) => (
                      <TenderDialogModals
                        modalProps={props}
                        modalType="delete"
                      />
                    ))
                    .catch(() => null)
                }
              />
            )}
          {tenderDetails &&
            tenderOwner &&
            tenderStatus === TenderStatus.CANCELLED && (
              <Button
                fill="outline"
                color="primary"
                caption={t(`tendersPages.viewTender.editTenderCta`)}
                onClick={() => null}
              />
            )}
          {tenderDetails &&
            tenderOwner &&
            tenderStatus === TenderStatus.IDEATION && (
              <Button
                fill="outline"
                color="primary"
                caption={t(`tendersPages.viewTender.startVotingCta`)}
                onClick={() =>
                  uuiModals
                    .show<string>((props) => (
                      <TenderDialogModals
                        modalProps={props}
                        modalType="voting"
                        tender={tenderDetails}
                      />
                    ))
                    .catch(() => null)
                }
              />
            )}
          {tenderDetails &&
            tenderOwner &&
            tenderDetails?.status === TenderStatus.CANCELLED && (
              <Button
                fill="outline"
                color="primary"
                caption={t(`tendersPages.viewTender.reactivateCta`)}
                onClick={() =>
                  uuiModals
                    .show<string>((props) => (
                      <TenderDialogModals
                        modalProps={props}
                        modalType="reactivate"
                        tender={tenderDetails}
                      />
                    ))
                    .catch(() => null)
                }
              />
            )}
          {tenderDetails &&
            tenderOwner &&
            tenderDetails?.status === TenderStatus.DRAFT && (
              <Button
                color="primary"
                caption={t(`tendersPages.viewTender.publishCta`)}
                onClick={() => null}
              />
            )}
        </FlexRow>
      </FlexRow>
      <Panel cx={styles.alertsWrapper}>
        {proposals?.length === 0 && tenderOwner && (
          <WarningAlert
            cx={styles.alert}
            actions={[
              {
                name: t(`tendersPages.viewTender.prolongDateCta`),
                action: () =>
                  uuiModals
                    .show<string>((props) => (
                      <TenderDialogModals
                        modalProps={props}
                        modalType="prolong"
                        tender={tenderDetails}
                      />
                    ))
                    .catch(() => null),
              },
            ]}
          >
            <Text size="30">
              {t(`tendersPages.viewTender.noProposalsAlertMessage`)}
            </Text>
          </WarningAlert>
        )}

        {proposals?.length === 1 && tenderOwner && (
          <WarningAlert
            cx={styles.alert}
            actions={[
              {
                name: t(`tendersPages.viewTender.selectWinnerCta`),
                action: () => null,
              },
              {
                name: t(`tendersPages.viewTender.prolongDateCta`),
                action: () =>
                  uuiModals
                    .show<string>((props) => (
                      <TenderDialogModals
                        modalProps={props}
                        modalType="prolong"
                        tender={tenderDetails}
                      />
                    ))
                    .catch(() => null),
              },
            ]}
          >
            <Text size="30">
              {t(`tendersPages.viewTender.singleProposalAlertMessage`)}
            </Text>
          </WarningAlert>
        )}

        {proposals && tenderOwner && proposals?.length >= 2 && (
          <WarningAlert
            cx={styles.alert}
            actions={[
              {
                name: t(`tendersPages.viewTender.prolongDateCta`),
                action: () =>
                  uuiModals
                    .show<string>((props) => (
                      <TenderDialogModals
                        modalProps={props}
                        modalType="prolong"
                        tender={tenderDetails}
                      />
                    ))
                    .catch(() => null),
              },
            ]}
          >
            <Text size="30">
              {t(`tendersPages.viewTender.selectWinnerAlertMessage`)}
            </Text>
          </WarningAlert>
        )}
        {/* TODO: */}
        <Text>
          1 Days left for proposals submission. Proposals voting process is
          ready to start.
        </Text>
        {/* TODO: */}
        <HintAlert onClose={() => alert('close action')}>
          <Text size="30">
            Proposals submission is completed. Please start proposals voting
            process.
          </Text>
        </HintAlert>
      </Panel>
      {tab === 'tender' ? (
        <Panel cx={styles.contentWrapper}>
          <FlexRow>
            <Panel cx={styles.dateWrapper}>
              <Text fontSize="12" fontWeight="400" color="tertiary">
                {t(`tendersPages.viewTender.createdOnLabel`)}
              </Text>
              <Text fontSize="12" fontWeight="400">
                {isLoading ? (
                  <TextPlaceholder>Text</TextPlaceholder>
                ) : (
                  dayjs(tenderDetails?.createdAt).format('D MMM YYYY')
                )}
              </Text>
            </Panel>
            <Panel cx={styles.dateWrapper}>
              <Text fontSize="12" fontWeight="400" color="tertiary">
                {t(`tendersPages.viewTender.editedOnLabel`)}
              </Text>
              <Text fontSize="12" fontWeight="400">
                {isLoading ? (
                  <TextPlaceholder>Text</TextPlaceholder>
                ) : (
                  dayjs(tenderDetails?.modifiedAt).format('D MMM YYYY')
                )}
              </Text>
            </Panel>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.descriptionLabel}>
              {t(`tendersPages.viewTender.descriptionLabel`)}
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize="16" fontWeight="400" cx={styles.descriptionContent}>
              {isLoading ? (
                <TextPlaceholder wordsCount={100}>Text</TextPlaceholder>
              ) : (
                tenderDetails?.description
              )}
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.detailsLabel}>
              {t(`tendersPages.viewTender.detailsLabel`)}
            </Text>
          </FlexRow>
          {/* details */}
          <FlexRow cx={styles.detailsWrapper}>
            {/* 1st column */}
            <FlexCell width="100%" cx={styles.column}>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    {t(`tendersPages.viewTender.submissionPeriodLabel`)}
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  {isLoading ? (
                    <TextPlaceholder wordsCount={3}>Text</TextPlaceholder>
                  ) : (
                    <Text fontSize="16" fontWeight="400">{`${dayjs(
                      tenderDetails?.submissionStart,
                    ).format('D MMM YYYY')} -
                ${dayjs(tenderDetails?.submissionEnd).format(
                  'D MMM YYYY',
                )}`}</Text>
                  )}
                </FlexCell>
              </FlexRow>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    {t(`tendersPages.viewTender.categoryLabel`)}
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400">
                    {isLoading ? (
                      <TextPlaceholder>Text</TextPlaceholder>
                    ) : (
                      tenderDetails?.category &&
                      tenderDetails?.category.map(
                        (category, index) =>
                          t(`${getCategoryName(category)?.name}`) +
                          (index !== tenderDetails?.category.length - 1
                            ? ', '
                            : ''),
                      )
                    )}
                  </Text>
                </FlexCell>
              </FlexRow>
            </FlexCell>
            {/* 2nd column */}
            <FlexCell width="100%" cx={styles.column} alignSelf="flex-start">
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    {t(`tendersPages.viewTender.expectedReadinessLabel`)}
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400">
                    {isLoading ? (
                      <TextPlaceholder>Text</TextPlaceholder>
                    ) : tenderDetails?.expectedDelivery ? (
                      dayjs(tenderDetails?.expectedDelivery).format(
                        'D MMM YYYY',
                      )
                    ) : (
                      t(`tendersPages.viewTender.notSpecified`)
                    )}
                  </Text>
                </FlexCell>
              </FlexRow>
            </FlexCell>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.artObjectLabel}>
              {t(`tendersPages.viewTender.objectLocationLabel`)}
            </Text>
          </FlexRow>
          <FlexRow>
            <FlexCell width="100%" cx={styles.column}>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    {t(`tendersPages.viewTender.addressLineLabel`)}
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  {isLoading ? (
                    <TextPlaceholder>Text</TextPlaceholder>
                  ) : (
                    <Text fontSize="16" fontWeight="400">
                      {process.env.REACT_APP_LOCATION},{' '}
                      {tenderDetails?.location.nestedLocation.name},{' '}
                      {tenderDetails?.location.addressLine}
                    </Text>
                  )}
                </FlexCell>
              </FlexRow>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    {t(`tendersPages.viewTender.addressCommentLabel`)}
                  </Text>
                </FlexCell>
                {tenderDetails?.location.addressComment && (
                  <FlexCell width="100%">
                    <Text fontSize="16" fontWeight="400">
                      {isLoading ? (
                        <TextPlaceholder>Text</TextPlaceholder>
                      ) : (
                        tenderDetails?.location.addressComment
                      )}
                    </Text>
                  </FlexCell>
                )}
              </FlexRow>
            </FlexCell>
            <FlexCell width="100%" cx={styles.column}>
              {tenderDetails?.location &&
                tenderDetails.location.geoPosition && (
                  <MapContainer
                    center={[
                      tenderDetails?.location.geoPosition.latitude,
                      tenderDetails?.location.geoPosition.longitude,
                    ]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '111px', width: '100%' }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapCordsController
                      cityCords={{
                        lat: tenderDetails?.location.geoPosition.latitude,
                        lng: tenderDetails?.location.geoPosition.longitude,
                      }}
                    />
                    <Marker
                      position={[
                        tenderDetails?.location.geoPosition.latitude,
                        tenderDetails?.location.geoPosition.longitude,
                      ]}
                    />
                  </MapContainer>
                )}
            </FlexCell>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.tenderOwnerLabel}>
              {t(`tendersPages.viewTender.tenderOwnerLabel`)}
            </Text>
          </FlexRow>
          <FlexRow>
            {isLoading ? (
              <TextPlaceholder>Text</TextPlaceholder>
            ) : (
              <AuthorCard
                organization={tenderDetails?.organization}
                authorName={tenderDetails?.ownerName}
                authorPicture={tenderDetails?.ownerPicture}
              />
            )}
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.attachmentsLabel}>
              {t(`tendersPages.viewTender.additionalInformationLabel`)}
            </Text>
          </FlexRow>
          <FlexRow cx={styles.fileCardWrapper}>
            {tenderDetails?.files &&
              tenderDetails.files.map((file, index) => (
                <a href={file.path} className={styles.fileCard} key={index}>
                  <FileCard
                    file={{
                      id: file.id,
                      name: file.name,
                      size: file.size,
                      extension: file.extension,
                    }}
                  />
                </a>
              ))}
          </FlexRow>
        </Panel>
      ) : (
        <Panel>
          <Panel cx={styles.contentWrapper}>
            {!proposals || (proposals && proposals?.length === 0) ? (
              <EmptyContent
                icon={SearchGuyIcon}
                description={t(`tendersPages.viewTender.noProposalsMessage`)}
              />
            ) : (
              proposals?.map((proposal) => (
                <Panel cx={styles.proposalCardWrapper}>
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    mostLiked={isMostLiked(proposal.id)}
                    tenderStatus={tenderDetails.status}
                    likesEnabled
                  />
                </Panel>
              ))
            )}
          </Panel>
        </Panel>
      )}
    </Panel>
  );
};
