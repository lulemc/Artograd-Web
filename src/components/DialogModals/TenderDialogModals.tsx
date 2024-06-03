import {
  Button,
  DatePicker,
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
  RadioGroup,
  RangeDatePicker,
  RangeDatePickerValue,
  ScrollBars,
  Text,
  useForm,
} from '@epam/uui';
import { IModal, useArrayDataSource } from '@epam/uui-core';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styles from './TenderDialogModals.module.scss';
import { Tender, TenderStatus } from '../../types';
import { tendersApi } from '../../services/api/tendersApi';
import { useHistory } from 'react-router-dom';

const TRANSLATION_KEY = 'tendersPages.viewTender.modals';

const ProlongTenderModal = ({
  modalProps,
  tender,
}: {
  modalProps: IModal<string>;
  tender?: Tender;
}) => {
  type ProlongType = {
    tenderValidity?: { from: string; to: string };
    tenderExpectedDelivery?: string;
  };
  const { t } = useTranslation();
  const [validity, setValidity] = useState({
    from: dayjs(tender?.submissionStart).format('YYYY-MM-DD'),
    to: dayjs(tender?.submissionEnd).format('YYYY-MM-DD'),
  } as RangeDatePickerValue);
  const [delivery, setDelivery] = useState(
    dayjs(tender?.expectedDelivery).format('YYYY-MM-DD') as string | null,
  );
  const { lens } = useForm<ProlongType>({
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

  const prolongTender = () => {
    if (tender) {
      tendersApi
        .put(tender.id, {
          ...tender,
          submissionStart: validity.from,
          submissionEnd: validity.to,
          expectedDelivery: delivery,
        })
        .then(() => history.go(0));
    }
  };

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title={t(`${TRANSLATION_KEY}.prolongTitle`)}
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
                      value={validity}
                      onValueChange={setValidity}
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
                          validity?.to
                            ? dayjs(tender?.expectedDelivery).format(
                                'YYYY-MM-DD',
                              )
                            : undefined,
                        ).valueOf()
                      }
                      value={delivery}
                      onValueChange={setDelivery}
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
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.prolongCta`)}
              onClick={() => prolongTender()}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

const CancelTenderModal = ({
  modalProps,
  tender,
}: {
  modalProps: IModal<string>;
  tender?: Tender;
}) => {
  const history = useHistory();
  type CancelType = {
    cancelationReason: string;
  };
  const reasonsList = [
    { id: 1, name: 'Not enough proposals' },
    { id: 2, name: 'Other' },
  ];
  const { t } = useTranslation();
  const [reason, setReason] = useState({
    id: reasonsList[0].id,
    name: reasonsList[0].name,
  });
  const { lens } = useForm<CancelType>({
    value: { cancelationReason: '' },
    onSave: (person) => Promise.resolve({ form: person }),
    getMetadata: () => ({
      props: {
        cancelationReason: { isRequired: true },
      },
    }),
  });
  const dataSource = useArrayDataSource(
    {
      items: reasonsList,
    },
    [],
  );

  const cancelTender = () => {
    if (tender) {
      tendersApi
        .put(tender.id, {
          ...tender,
          status: TenderStatus.CANCELLED,
          cancellationReason: reason.name,
        })
        .then(() => history.push('/tenders'));
    }
  };
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title={t(`${TRANSLATION_KEY}.cancelTitle`)}
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
                  {t(`${TRANSLATION_KEY}.notification`)}
                </Text>
                <Text size="36" cx={styles.modalDescription}>
                  {t(`${TRANSLATION_KEY}.cancelDescription`)}
                </Text>

                <FlexRow>
                  <LabeledInput
                    label={t(`${TRANSLATION_KEY}.cancelationReason`)}
                    {...lens.prop('cancelationReason').toProps()}
                  >
                    <PickerInput
                      id="cancelationReason"
                      dataSource={dataSource}
                      value={reason}
                      onValueChange={setReason}
                      getName={(item) => item.name}
                      entityName="Cancelation reason"
                      selectionMode="single"
                      valueType="entity"
                      sorting={{ field: 'name', direction: 'asc' }}
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
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.cancelTenderCta`)}
              onClick={() => cancelTender()}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

const ReactivateTenderModal = ({
  modalProps,
  tender,
}: {
  modalProps: IModal<string>;
  tender?: Tender;
}) => {
  type ReactivateType = {
    tenderValidity?: { from: string; to: string };
    tenderExpectedDelivery?: string;
  };
  const { t } = useTranslation();
  const [validity, setValidity] = useState({
    from: dayjs(tender?.submissionStart).format('YYYY-MM-DD'),
    to: dayjs(tender?.submissionEnd).format('YYYY-MM-DD'),
  } as RangeDatePickerValue);
  const [delivery, setDelivery] = useState(
    dayjs(tender?.expectedDelivery).format('YYYY-MM-DD') as string | null,
  );
  const { lens } = useForm<ReactivateType>({
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

  const reactivateTender = () => {
    if (tender) {
      tendersApi
        .put(tender.id, {
          ...tender,
          status: TenderStatus.PUBLISHED,
          submissionStart: validity.from,
          submissionEnd: validity.to,
          expectedDelivery: delivery,
        })
        .then(() => history.go(0));
    }
  };
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title={t(`${TRANSLATION_KEY}.reactivateTitle`)}
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexCell>
              <Panel margin="24">
                <Text size="36" cx={styles.modalDescription}>
                  {t(`${TRANSLATION_KEY}.reactivateDescription`)}
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
                      value={validity}
                      onValueChange={setValidity}
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
                          validity?.to
                            ? dayjs(tender?.expectedDelivery).format(
                                'YYYY-MM-DD',
                              )
                            : undefined,
                        ).valueOf()
                      }
                      value={delivery}
                      onValueChange={setDelivery}
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
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.reactivateCta`)}
              onClick={() => reactivateTender()}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

const DeleteTenderModal = ({ modalProps }: { modalProps: IModal<string> }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const deleteTender = (tender?: Tender) => {
    if (tender) {
      tendersApi
        .put(tender.id, { ...tender, status: TenderStatus.DELETED })
        .then(() => history.push('/tenders'));
    }
  };
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title={t(`${TRANSLATION_KEY}.deleteTitle`)}
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
                  {t(`${TRANSLATION_KEY}.notification`)}
                </Text>
                <Text size="36">
                  {t(`${TRANSLATION_KEY}.deleteDescription`)}
                </Text>
              </Panel>
            </FlexCell>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.deleteCta`)}
              onClick={() => deleteTender()}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

const VotingBeginningModal = (modalProps: IModal<string>) => {
  type VotingType = {
    tenderExpectedDelivery?: string;
  };
  const { t } = useTranslation();
  const { lens } = useForm<VotingType>({
    value: {},
    onSave: (person) => Promise.resolve({ form: person }),
    getMetadata: () => ({
      props: {
        tenderExpectedDelivery: { isRequired: true },
      },
    }),
  });
  const [votingBy, setVotingBy] = useState(1);
  const [singlePickerValue, singleOnValueChange] = useState(1);
  const languageLevels = [
    { id: 1, level: t(`${TRANSLATION_KEY}.oneWeek`) },
    { id: 2, level: t(`${TRANSLATION_KEY}.twoWeeks`) },
    { id: 3, level: t(`${TRANSLATION_KEY}.oneMonth`) },
  ];
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
            title={t(`${TRANSLATION_KEY}.startVotingTitle`)}
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <Panel margin="24">
              <FlexRow>
                <RadioGroup
                  name="setby"
                  items={[
                    { id: 1, name: t(`${TRANSLATION_KEY}.setByOption1`) },
                    { id: 2, name: t(`${TRANSLATION_KEY}.setByOption2`) },
                  ]}
                  value={votingBy}
                  onValueChange={setVotingBy}
                  direction="horizontal"
                />
              </FlexRow>
              {votingBy === 1 ? (
                <FlexRow>
                  <LabeledInput
                    label={t(`${TRANSLATION_KEY}.votingBy`)}
                    {...lens.prop('tenderExpectedDelivery').toProps()}
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
                    />
                  </LabeledInput>
                </FlexRow>
              ) : (
                <FlexRow>
                  <LabeledInput
                    label={t(`${TRANSLATION_KEY}.votingDuratation`)}
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
                      sorting={{ field: 'id', direction: 'asc' }}
                      disableClear
                    />
                  </LabeledInput>
                </FlexRow>
              )}
            </Panel>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.startVotingCta`)}
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

type ModalType = {
  modalType: 'voting' | 'delete' | 'reactivate' | 'cancel' | 'prolong';
};

export const TenderDialogModals = ({
  modalProps,
  modalType,
  tender,
}: {
  modalProps: IModal<string>;
  modalType: ModalType | string;
  tender?: Tender;
}) => {
  const Modal = () => {
    switch (modalType) {
      case 'voting':
        return <VotingBeginningModal {...modalProps} />;
      case 'prolong':
        return <ProlongTenderModal modalProps={modalProps} tender={tender} />;
      case 'cancel':
        return <CancelTenderModal modalProps={modalProps} tender={tender} />;
      case 'reactivate':
        return (
          <ReactivateTenderModal modalProps={modalProps} tender={tender} />
        );
      case 'delete':
      default:
        return <DeleteTenderModal modalProps={modalProps} />;
    }
  };
  return <Modal />;
};
