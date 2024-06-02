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
  ScrollBars,
  Text,
  useForm,
} from '@epam/uui';
import { IModal, useArrayDataSource } from '@epam/uui-core';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styles from './DialogModals.module.scss';

const TRANSLATION_KEY = 'tendersPages.viewTender.modals';

const ProlongTenderModal = (modalProps: IModal<string>) => {
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
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.prolongCta`)}
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

const CancelTenderModal = (modalProps: IModal<string>) => {
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
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.cancelTenderCta`)}
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

const ReactivateTenderModal = (modalProps: IModal<string>) => {
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
              caption={t(`${TRANSLATION_KEY}.cancelCta`)}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="primary"
              caption={t(`${TRANSLATION_KEY}.reactivateCta`)}
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
};

const DeleteTenderModal = ({
  modalProps,
  onModalSubmit,
}: {
  modalProps: IModal<string>;
  onModalSubmit(): void;
}) => {
  const { t } = useTranslation();
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
              onClick={() => onModalSubmit()}
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

export const DialogModals = ({
  modalProps,
  modalType,
  onModalSubmit,
}: {
  modalProps: IModal<string>;
  modalType: ModalType | string;
  onModalSubmit(): void;
}) => {
  const Modal = () => {
    switch (modalType) {
      case 'voting':
        return <VotingBeginningModal {...modalProps} />;
      case 'prolong':
        return <ProlongTenderModal {...modalProps} />;
      case 'cancel':
        return <CancelTenderModal {...modalProps} />;
      case 'reactivate':
        return <ReactivateTenderModal {...modalProps} />;
      case 'delete':
      default:
        return (
          <DeleteTenderModal
            onModalSubmit={onModalSubmit}
            modalProps={modalProps}
          />
        );
    }
  };
  return <Modal />;
};
