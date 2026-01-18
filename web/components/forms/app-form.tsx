'use client';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import dynamic from 'next/dynamic';

const FormTextField = dynamic(() => import('./form-text-field').then((mod) => mod.FormTextField));
const FormNumberField = dynamic(() =>
  import('./form-number-field').then((mod) => mod.FormNumberField),
);
const FormPokemonAutocomplete = dynamic(() =>
  import('./form-pokemon-autocomplete').then((mod) => mod.FormPokemonAutocomplete),
);
const FormActionButtons = dynamic(() =>
  import('./form-action-buttons').then((mod) => mod.FormActionButtons),
);
const FormSuccessDialog = dynamic(
  () => import('./form-success-dialog').then((mod) => mod.FormSuccessDialog),
  { ssr: false },
);

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: FormTextField,
    PokemonAutocomplete: FormPokemonAutocomplete,
    NumberField: FormNumberField,
  },
  formComponents: {
    ActionButtons: FormActionButtons,
    SuccessDialog: FormSuccessDialog,
  },
  fieldContext,
  formContext,
});
