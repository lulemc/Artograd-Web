import { TFunction } from 'i18next';
import { i18n as i18nFromUui } from '@epam/uui';
export const overrideUUILocalisation = (
  t: TFunction<'translation', undefined>,
) => {
  i18nFromUui.form = {
    ...i18nFromUui.form,
    notifications: {
      actionButtonCaption: t('UUI.actionButtonCaption'),
      unsavedChangesMessage: t('UUI.unsavedChangesMessage'),
    },
    modals: {
      beforeLeaveMessage: t('UUI.beforeLeaveMessage'),
      discardButton: t('UUI.discardButton'),
      saveButton: t('UUI.saveButton'),
    },
  };
  i18nFromUui.pickerInput = {
    ...i18nFromUui.pickerInput,
    clearSelectionButtonSingle: t('UUI.clearSelectionButtonSingle'),
  };
  i18nFromUui.lenses.validation = {
    ...i18nFromUui.lenses.validation,
    isRequiredMessage: t('global.lenses.isRequiredMessage'),
  };
};
