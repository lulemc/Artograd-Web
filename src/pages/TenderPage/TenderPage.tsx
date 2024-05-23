import {
  Button,
  FileCard,
  FlexCell,
  FlexRow,
  FlexSpacer,
  Panel,
  TabButton,
  Text,
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AuthorCard } from '../../components/AuthorCard/AuthorCard';
import { ProposalCard } from '../../components/ProposalCard/ProposalCard';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import SearchGuyIcon from '../../images/searchGuy.svg';

type TenderRouteParams = {
  tenderId: string;
};

export const TenderPage = () => {
  const { t } = useTranslation();
  const { tenderId } = useParams<TenderRouteParams>();
  const [tenderDetails, setTenderDetails] = useState<Tender | undefined>();
  const [tab, setTab] = useState('tender');
  const proposals = tenderDetails?.proposals;
  const tenderStatus = tenderDetails?.status;

  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  useEffect(() => {
    tendersApi
      .get(undefined, undefined, undefined, undefined, undefined, tenderId)
      .then((response) => {
        console.log(':::res', response);
        setTenderDetails(response);
      });
  }, []);

  const getFileExtension = (url: string) => {
    return url.split(/[#?]/)[0].split('.').pop()?.trim();
  };

  return (
    <Panel cx={styles.wrapper}>
      <FlexRow>
        <FlexCell width="100%">
          <Text cx={styles.pageTitle}>{tenderDetails?.title}</Text>
        </FlexCell>
        <FlexSpacer />
        <FlexCell width="100%" textAlign="right">
          <Text fontSize="14" fontWeight="400">
            <DotIndicator status={tenderDetails?.status} />
            {t(`global.statuses.${tenderDetails?.status.toLowerCase()}`)}
          </Text>
        </FlexCell>
      </FlexRow>
      <FlexRow borderBottom>
        <FlexRow>
          <TabButton
            caption={'Overview'}
            isLinkActive={tab === 'tender'}
            onClick={() => setTab('tender')}
            size="48"
          />
          <TabButton
            caption={'Submitted Proposals '}
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
              caption="Open Art Object"
              fill="ghost"
              onClick={() => null}
            />
          )}
          {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus !== TenderStatus.CANCELLED &&
            tenderStatus !== TenderStatus.CLOSED && (
              <Button
                fill="ghost"
                color="secondary"
                caption="Cancel Tender"
                onClick={() => null}
              />
            )}
          {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus === TenderStatus.CANCELLED && (
              <Button
                fill="ghost"
                color="secondary"
                caption="Delete Tender"
                onClick={() => null}
              />
            )}
          {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus === TenderStatus.CANCELLED && (
              <Button
                fill="outline"
                color="primary"
                caption="Edit"
                onClick={() => null}
              />
            )}
          {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus === TenderStatus.IDEATION && (
              <Button
                fill="outline"
                color="primary"
                caption="Start Voting"
                onClick={() => null}
              />
            )}
          {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderDetails?.status === TenderStatus.CANCELLED && (
              <Button
                fill="outline"
                color="primary"
                caption="Re-Activate"
                onClick={() => null}
              />
            )}
          {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderDetails?.status === TenderStatus.DRAFT && (
              <Button color="primary" caption="Publish" onClick={() => null} />
            )}
        </FlexRow>
      </FlexRow>
      {tab === 'tender' ? (
        <Panel cx={styles.contentWrapper}>
          <FlexRow>
            <Panel cx={styles.dateWrapper}>
              <Text fontSize="12" fontWeight="400" color="tertiary">
                Created on:
              </Text>
              <Text fontSize="12" fontWeight="400">
                {dayjs(tenderDetails?.createdAt).format('D MMM YYYY')}
              </Text>
            </Panel>
            <Panel cx={styles.dateWrapper}>
              <Text fontSize="12" fontWeight="400" color="tertiary">
                Edited on:
              </Text>
              <Text fontSize="12" fontWeight="400">
                {dayjs(tenderDetails?.modifiedAt).format('D MMM YYYY')}
              </Text>
            </Panel>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.descriptionLabel}>
              Tender description
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize="16" fontWeight="400" cx={styles.descriptionContent}>
              {tenderDetails?.description}
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.detailsLabel}>
              Tender Details
            </Text>
          </FlexRow>
          {/* details */}
          <FlexRow cx={styles.detailsWrapper}>
            {/* 1st column */}
            <FlexCell width="100%" cx={styles.column}>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    Proposals submission period:
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400">{`${dayjs(
                    tenderDetails?.submissionStart,
                  ).format('D MMM YYYY')} -
                ${dayjs(tenderDetails?.submissionEnd).format(
                  'D MMM YYYY',
                )}`}</Text>
                </FlexCell>
              </FlexRow>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    Category:{' '}
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400">
                    {tenderDetails?.category &&
                      tenderDetails?.category.map(
                        (category, index) =>
                          t(`${getCategoryName(category)?.name}`) +
                          (index !== tenderDetails?.category.length - 1
                            ? ', '
                            : ''),
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
                    Expected readiness:{' '}
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400">
                    {tenderDetails?.expectedDelivery &&
                      dayjs(tenderDetails?.expectedDelivery).format(
                        'D MMM YYYY',
                      )}
                  </Text>
                </FlexCell>
              </FlexRow>
            </FlexCell>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.artObjectLabel}>
              Art Object Location
            </Text>
          </FlexRow>
          <FlexRow>
            <FlexCell width="100%" cx={styles.column}>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    Address line:
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400">
                    {process.env.REACT_APP_LOCATION},{' '}
                    {tenderDetails?.location.nestedLocation.name},{' '}
                    {tenderDetails?.location.addressLine}
                  </Text>
                </FlexCell>
              </FlexRow>
              <FlexRow>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400" color="tertiary">
                    Comments:
                  </Text>
                </FlexCell>
                <FlexCell width="100%">
                  <Text fontSize="16" fontWeight="400">
                    {tenderDetails?.location.addressComment}
                  </Text>
                </FlexCell>
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
              Tender owner
            </Text>
          </FlexRow>
          <FlexRow>
            <AuthorCard
              organization={tenderDetails?.organization}
              authorName={tenderDetails?.ownerName}
              authorPicture={tenderDetails?.ownerPicture}
            />
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" fontWeight="600" cx={styles.attachmentsLabel}>
              Additional information
            </Text>
          </FlexRow>
          <FlexRow>
            {tenderDetails?.files &&
              tenderDetails.files.map((file) => (
                <FileCard
                  cx={styles.fileCard}
                  file={{
                    id: 1,
                    name: 'file',
                    size: 1111,
                    extension: getFileExtension(file),
                  }}
                />
              ))}
          </FlexRow>
        </Panel>
      ) : (
        <Panel>
          <Panel cx={styles.alertsWrapper}>
            {/* {proposals?.length === 0 && ( */}
            <WarningAlert
              cx={styles.alert}
              actions={[{ name: 'Prolong dates', action: () => null }]}
            >
              <Text size="30">
                Indicated tender validity period is over, and proposals cannot
                be submitted. You can either prolong proposal submission period
                to accept new proposals, or cancel tender.
              </Text>
            </WarningAlert>
            {/* )} */}

            {/* {proposals?.length === 1 && ( */}
            <WarningAlert
              cx={styles.alert}
              actions={[
                { name: 'Appoint Winner', action: () => null },
                { name: 'Prolong dates', action: () => null },
              ]}
            >
              <Text size="30">
                There are not enough proposals to start voting process. You can
                either prolong proposal submission period to accept new
                proposals, or appoint this only submitted proposal as a tender
                winner.
              </Text>
            </WarningAlert>
            {/* )} */}

            {/* {proposals && proposals?.length >= 2 && ( */}
            <WarningAlert
              cx={styles.alert}
              actions={[{ name: 'Prolong dates', action: () => null }]}
            >
              <Text size="30">
                The number of proposals to start voting process is acceptable
                minimum. You can either prolong proposal submission period to
                accept new proposals, or cancel tender.
              </Text>
            </WarningAlert>
            {/* )} */}
          </Panel>
          <Panel cx={styles.contentWrapper}>
            {!proposals || (proposals && proposals?.length === 0) ? (
              <EmptyContent
                icon={SearchGuyIcon}
                description="No proposal submitted yet"
              />
            ) : (
              proposals?.map((proposal) => (
                <Panel cx={styles.proposalCardWrapper}>
                  <ProposalCard proposal={proposal} />
                </Panel>
              ))
            )}
          </Panel>
        </Panel>
      )}
    </Panel>
  );
};
