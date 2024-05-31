import {
  Button,
  DatePicker,
  FileCard,
  FlexCell,
  FlexRow,
  FlexSpacer,
  LabeledInput,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  PickerInput,
  RangeDatePicker,
  ScrollBars,
  TabButton,
  Text,
  WarningAlert,
  useForm,
} from '@epam/uui';
import styles from './TenderPage.module.scss';
import { Trans, useTranslation } from 'react-i18next';
import { tendersApi } from '../../services/api/tendersApi';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tender } from '../../types';
import { DotIndicator } from '../../components/DotIndicator/DotIndicator';
import { getCategoryName } from '../../utils/getCategoryName';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { MapCordsController } from '../../components/MapCordsController/MapCordsController';
import dayjs, { Dayjs } from 'dayjs';
import { ReactComponent as NavigationChevronRightOutlineIcon } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
import { AuthorCard } from '../../components/AuthorCard/AuthorCard';
import { ProposalCard } from '../../components/ProposalCard/ProposalCard';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import SearchGuyIcon from '../../images/searchGuy.svg';
import { IModal, useArrayDataSource, useUuiContext } from '@epam/uui-core';

type TenderRouteParams = {
  tenderId: string;
};

export const TenderPage = () => {
  const { t } = useTranslation();
  const { uuiModals } = useUuiContext();
  const { tenderId } = useParams<TenderRouteParams>();
  const [tenderDetails, setTenderDetails] = useState<Tender | undefined>();
  const [tab, setTab] = useState('tender');
  const proposals = tenderDetails?.proposals;
  // const tenderStatus = tenderDetails?.status;

  // const username = useSelector(
  //   (state: RootState) => state.identity.userData['cognito:username'],
  // );

  useEffect(() => {
    tendersApi
      .get(undefined, undefined, undefined, undefined, undefined, tenderId)
      .then((response) => {
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
          {/* {tenderDetails && tenderStatus === TenderStatus.CLOSED && ( */}
          <Button
            icon={NavigationChevronRightOutlineIcon}
            iconPosition="right"
            caption={t(`tendersPages.viewTender.openArtObjectCta`)}
            fill="ghost"
            onClick={() => null}
          />
          {/* )} */}
          {/* {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus !== TenderStatus.CANCELLED &&
            tenderStatus !== TenderStatus.CLOSED && ( */}
          <Button
            fill="ghost"
            color="secondary"
            caption={t(`tendersPages.viewTender.cancelTenderCta`)}
            onClick={() =>
              uuiModals
                .show<string>((props) => <CancelTenderModal {...props} />)
                .catch(() => null)
            }
          />
          {/* )} */}
          {/* {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus === TenderStatus.CANCELLED && ( */}
          <Button
            fill="ghost"
            color="secondary"
            caption={t(`tendersPages.viewTender.deleteTenderCta`)}
            onClick={() =>
              uuiModals
                .show<string>((props) => <DeleteTenderModal {...props} />)
                .catch(() => null)
            }
          />
          {/* )} */}
          {/* {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus === TenderStatus.CANCELLED && ( */}
          <Button
            fill="outline"
            color="primary"
            caption={t(`tendersPages.viewTender.editTenderCta`)}
            onClick={() => null}
          />
          {/* )} */}
          {/* {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderStatus === TenderStatus.IDEATION && ( */}
          <Button
            fill="outline"
            color="primary"
            caption={t(`tendersPages.viewTender.startVotingCta`)}
            onClick={() =>
              uuiModals
                .show<string>((props) => <VotingBeginningModal {...props} />)
                .catch(() => null)
            }
          />
          {/* )} */}
          {/* {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderDetails?.status === TenderStatus.CANCELLED && ( */}
          <Button
            fill="outline"
            color="primary"
            caption={t(`tendersPages.viewTender.reactivateCta`)}
            onClick={() =>
              uuiModals
                .show<string>((props) => <ReactivateTenderModal {...props} />)
                .catch(() => null)
            }
          />
          {/* )} */}
          {/* {tenderDetails &&
            username === tenderDetails.ownerId &&
            tenderDetails?.status === TenderStatus.DRAFT && ( */}
          <Button
            color="primary"
            caption={t(`tendersPages.viewTender.publishCta`)}
            onClick={() => null}
          />
          {/* )} */}
        </FlexRow>
      </FlexRow>
      <Panel cx={styles.alertsWrapper}>
        {/* {proposals?.length === 0 && ( */}
        <WarningAlert
          cx={styles.alert}
          actions={[
            {
              name: t(`tendersPages.viewTender.prolongDateCta`),
              action: () =>
                uuiModals
                  .show<string>((props) => <ProlongTenderModal {...props} />)
                  .catch(() => null),
            },
          ]}
        >
          <Text size="30">
            {t(`tendersPages.viewTender.noProposalsAlertMessage`)}
          </Text>
        </WarningAlert>
        {/* )} */}

        {/* {proposals?.length === 1 && ( */}
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
                  .show<string>((props) => <ProlongTenderModal {...props} />)
                  .catch(() => null),
            },
          ]}
        >
          <Text size="30">
            {t(`tendersPages.viewTender.singleProposalAlertMessage`)}
          </Text>
        </WarningAlert>
        {/* )} */}

        {/* {proposals && proposals?.length >= 2 && ( */}
        <WarningAlert
          cx={styles.alert}
          actions={[
            {
              name: t(`tendersPages.viewTender.prolongDateCta`),
              action: () =>
                uuiModals
                  .show<string>((props) => <ProlongTenderModal {...props} />)
                  .catch(() => null),
            },
          ]}
        >
          <Text size="30">
            {t(`tendersPages.viewTender.selectWinnerAlertMessage`)}
          </Text>
        </WarningAlert>
        {/* )} */}
      </Panel>
      {tab === 'tender' ? (
        <Panel cx={styles.contentWrapper}>
          <FlexRow>
            <Panel cx={styles.dateWrapper}>
              <Text fontSize="12" fontWeight="400" color="tertiary">
                {t(`tendersPages.viewTender.createdOnLabel`)}
              </Text>
              <Text fontSize="12" fontWeight="400">
                {dayjs(tenderDetails?.createdAt).format('D MMM YYYY')}
              </Text>
            </Panel>
            <Panel cx={styles.dateWrapper}>
              <Text fontSize="12" fontWeight="400" color="tertiary">
                {t(`tendersPages.viewTender.editedOnLabel`)}
              </Text>
              <Text fontSize="12" fontWeight="400">
                {dayjs(tenderDetails?.modifiedAt).format('D MMM YYYY')}
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
              {tenderDetails?.description}
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
                    {t(`tendersPages.viewTender.categoryLabel`)}
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
                    {t(`tendersPages.viewTender.expectedReadinessLabel`)}
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
                    {t(`tendersPages.viewTender.addressCommentLabel`)}
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
              {t(`tendersPages.viewTender.tenderOwnerLabel`)}
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
              {t(`tendersPages.viewTender.additionalInformationLabel`)}
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
          <Panel cx={styles.contentWrapper}>
            {!proposals || (proposals && proposals?.length === 0) ? (
              <EmptyContent
                icon={SearchGuyIcon}
                description={t(`tendersPages.viewTender.noProposalsMessage`)}
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

export const ProlongTenderModal = (modalProps: IModal<string>) => {
  type ProlongType = {
    tenderValidity?: { from: string; to: string };
    tenderExpectedDelivery?: string;
  };
  const { t } = useTranslation();
  const { lens, value: formValues } = useForm<ProlongType>({
    value: {},
    onSave: (person) => Promise.resolve({ form: person }),
    getMetadata: () => ({
      props: {
        tenderValidity: {
          validators: [
            (value) => [
              !value?.to &&
                !value?.from &&
                t('global.lenses.isRequiredMessage'),
            ],
          ],
        },
        tenderExpectedDelivery: { isRequired: false },
      },
    }),
  });
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title="Prolong Tender Dates"
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexCell>
              <Panel margin="24">
                <FlexRow cx={styles.rangeDatePickerWrapper}>
                  <LabeledInput
                    label={t(
                      'tendersPages.newTender.tenderValidityPeriodLabel',
                    )}
                    {...lens.prop('tenderValidity').toProps()}
                  >
                    <RangeDatePicker
                      {...lens.prop('tenderValidity').toProps()}
                      format="MMM D, YYYY"
                      rawProps={{
                        from: { 'data-testid': `tender-validity-from-input` },
                        to: { 'data-testid': `tender-validity-to-input` },
                      }}
                      filter={(day: Dayjs) =>
                        day.valueOf() >= dayjs().subtract(1, 'day').valueOf()
                      }
                    />
                  </LabeledInput>
                </FlexRow>
                <FlexRow>
                  <LabeledInput
                    label={t(
                      'tendersPages.newTender.tenderExpectedDeliveryLabel',
                    )}
                    {...lens.prop('tenderExpectedDelivery').toProps()}
                    sidenote={
                      <Trans
                        i18nKey="tendersPages.newTender.tenderExpectedDeliveryLabelSidenote"
                        components={{
                          i: <span className={styles.sideNote} />,
                        }}
                      />
                    }
                  >
                    <DatePicker
                      {...lens.prop('tenderExpectedDelivery').toProps()}
                      format="MMM D, YYYY"
                      placeholder={t('global.datePickerPlaceholder')}
                      rawProps={{
                        input: {
                          'data-testid': `tender-expected-delivery-input`,
                        },
                      }}
                      filter={(day: Dayjs) =>
                        day.valueOf() >=
                        dayjs(
                          formValues.tenderValidity?.to
                            ? formValues.tenderValidity?.to
                            : undefined,
                        ).valueOf()
                      }
                    />
                  </LabeledInput>
                </FlexRow>
              </Panel>
            </FlexCell>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption="Cancel"
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption="Prolong Dates"
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

export const CancelTenderModal = (modalProps: IModal<string>) => {
  type CancelType = {
    tenderValidity?: { from: string; to: string };
    tenderExpectedDelivery?: string;
  };
  const languageLevels = [{ id: 2, level: 'A1' }];
  const { t } = useTranslation();
  const [singlePickerValue, singleOnValueChange] = useState('');
  const { lens } = useForm<CancelType>({
    value: {},
    onSave: (person) => Promise.resolve({ form: person }),
    getMetadata: () => ({
      props: {
        tenderValidity: {
          validators: [
            (value) => [
              !value?.to &&
                !value?.from &&
                t('global.lenses.isRequiredMessage'),
            ],
          ],
        },
        tenderExpectedDelivery: { isRequired: false },
      },
    }),
  });
  const dataSource = useArrayDataSource(
    {
      items: languageLevels,
    },
    [],
  );
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title="Cancel Tender"
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexCell>
              <Panel margin="24">
                <Text
                  fontWeight="600"
                  size="36"
                  cx={styles.modalDescriptionLabel}
                >
                  Notification
                </Text>
                <Text size="36" cx={styles.modalDescription}>
                  If you cancel tender, it becomes inactive and proposals cannot
                  be submitted. Cancelled tender is still available in your
                  tender’s list, and can be either re-activated or removed
                  permanently. If the tender already has submitted proposals,
                  their owners would be notified automatically.
                </Text>

                <FlexRow>
                  <LabeledInput
                    label={t('Cancelation Reason')}
                    {...lens.prop('tenderExpectedDelivery').toProps()}
                  >
                    <PickerInput
                      dataSource={dataSource}
                      value={singlePickerValue}
                      onValueChange={singleOnValueChange}
                      getName={(item) => item.level}
                      entityName="Language level"
                      selectionMode="single"
                      valueType="id"
                      sorting={{ field: 'level', direction: 'asc' }}
                      disableClear
                    />
                  </LabeledInput>
                </FlexRow>
              </Panel>
            </FlexCell>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption="Cancel"
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption="Cancel Tender"
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

export const ReactivateTenderModal = (modalProps: IModal<string>) => {
  type ReactivateType = {
    tenderValidity?: { from: string; to: string };
    tenderExpectedDelivery?: string;
  };
  const { t } = useTranslation();
  const { lens, value: formValues } = useForm<ReactivateType>({
    value: {},
    onSave: (person) => Promise.resolve({ form: person }),
    getMetadata: () => ({
      props: {
        tenderValidity: {
          validators: [
            (value) => [
              !value?.to &&
                !value?.from &&
                t('global.lenses.isRequiredMessage'),
            ],
          ],
        },
        tenderExpectedDelivery: { isRequired: false },
      },
    }),
  });
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title="Re-activate Tender"
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexCell>
              <Panel margin="24">
                <Text size="36" cx={styles.modalDescription}>
                  By re-activating tender you make it available again for
                  accepting proposals.
                </Text>
                <FlexRow cx={styles.rangeDatePickerWrapper}>
                  <LabeledInput
                    label={t(
                      'tendersPages.newTender.tenderValidityPeriodLabel',
                    )}
                    {...lens.prop('tenderValidity').toProps()}
                  >
                    <RangeDatePicker
                      {...lens.prop('tenderValidity').toProps()}
                      format="MMM D, YYYY"
                      rawProps={{
                        from: { 'data-testid': `tender-validity-from-input` },
                        to: { 'data-testid': `tender-validity-to-input` },
                      }}
                      filter={(day: Dayjs) =>
                        day.valueOf() >= dayjs().subtract(1, 'day').valueOf()
                      }
                    />
                  </LabeledInput>
                </FlexRow>
                <FlexRow>
                  <LabeledInput
                    label={t(
                      'tendersPages.newTender.tenderExpectedDeliveryLabel',
                    )}
                    {...lens.prop('tenderExpectedDelivery').toProps()}
                    sidenote={
                      <Trans
                        i18nKey="tendersPages.newTender.tenderExpectedDeliveryLabelSidenote"
                        components={{
                          i: <span className={styles.sideNote} />,
                        }}
                      />
                    }
                  >
                    <DatePicker
                      {...lens.prop('tenderExpectedDelivery').toProps()}
                      format="MMM D, YYYY"
                      placeholder={t('global.datePickerPlaceholder')}
                      rawProps={{
                        input: {
                          'data-testid': `tender-expected-delivery-input`,
                        },
                      }}
                      filter={(day: Dayjs) =>
                        day.valueOf() >=
                        dayjs(
                          formValues.tenderValidity?.to
                            ? formValues.tenderValidity?.to
                            : undefined,
                        ).valueOf()
                      }
                    />
                  </LabeledInput>
                </FlexRow>
              </Panel>
            </FlexCell>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption="Cancel"
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption="Re-Activate"
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

export const DeleteTenderModal = (modalProps: IModal<string>) => {
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title="Delete Tender"
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexCell>
              <Panel margin="24">
                <Text
                  fontWeight="600"
                  size="36"
                  cx={styles.modalDescriptionLabel}
                >
                  Notification
                </Text>
                <Text size="36">
                  When you confirm ‘Delete’ action, the tender will be
                  permanently removed and not available in the tenders list.
                </Text>
              </Panel>
            </FlexCell>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption="Cancel"
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption="Delete"
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

export const VotingBeginningModal = (modalProps: IModal<string>) => {
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow>
        <Panel background="surface-main">
          <ModalHeader
            title="Start Proposals Voting"
            onClose={() => modalProps.abort()}
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexRow padding="24">
              <Text size="36"> qwertyu </Text>
            </FlexRow>
          </ScrollBars>
          <ModalFooter>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption="Cancel"
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption="Ok"
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};
