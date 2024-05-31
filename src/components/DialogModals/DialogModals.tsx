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

const DeleteTenderModal = (modalProps: IModal<string>) => {
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
  const [color, setColor] = useState(1);
  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal}>
        <Panel background="surface-main">
          <ModalHeader
            title="Start Proposals Voting"
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <Panel margin="24">
              <FlexRow>
                <RadioGroup
                  name="setby"
                  items={[
                    { id: 1, name: 'Set by date' },
                    { id: 2, name: 'Set by period' },
                  ]}
                  value={color}
                  onValueChange={setColor}
                  direction="horizontal"
                />
              </FlexRow>
              <FlexRow>
                <LabeledInput
                  label="Complete Voting By"
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
            </Panel>
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
              caption="Ok"
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
}: {
  modalProps: IModal<string>;
  modalType: ModalType | string;
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
        return <DeleteTenderModal {...modalProps} />;
    }
  };
  return <Modal />;
};
