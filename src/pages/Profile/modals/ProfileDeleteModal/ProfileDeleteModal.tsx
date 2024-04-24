import { IModal } from '@epam/uui-core';
import {
  Button,
  FlexCell,
  FlexRow,
  LabeledInput,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  ScrollBars,
  Text,
  TextInput,
  useForm,
} from '@epam/uui';
import { FlexSpacer } from '@epam/uui-components';
import { useTranslation } from 'react-i18next';

export function DeleteProfileModal(modalProps: IModal<{ delete: string }>) {
  const { t } = useTranslation();

  const { lens, save } = useForm<{ delete: string }>({
    value: { delete: '' },
    onSave: (confirm) => Promise.resolve({ form: confirm }),
    onSuccess: (form) => modalProps.success(form),
    getMetadata: () => ({
      props: {
        delete: {
          validators: [
            (val) => [
              val !== t('profilePage.Delete') &&
                t('profilePage.Incorrect value'),
            ],
          ],
        },
      },
    }),
  });

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow>
        <Panel>
          <ModalHeader
            title={t('profilePage.Delete account') + '?'}
            borderBottom
            onClose={() => modalProps.abort()}
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexRow padding="24">
              <Text>
                {t(
                  'profilePage.When you delete account, all created tenders and related proposals will be permanently removed.',
                )}{' '}
                {t('profilePage.This action cannot be undone.')}
              </Text>
            </FlexRow>
            <FlexRow padding="24" vPadding="12">
              <FlexCell grow={1}>
                <LabeledInput
                  label={t('profilePage.Type ‘Delete’ to confirm action')}
                  {...lens.prop('delete').toProps()}
                >
                  <TextInput
                    placeholder={t('profilePage.Delete')}
                    {...lens.prop('delete').toProps()}
                  />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption={t('profilePage.Cancel')}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption={t('profilePage.Delete account')}
              onClick={save}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
