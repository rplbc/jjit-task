'use client';

import { useAppForm } from '@/components/forms/app-form';
import { trainerApi } from '@/lib/api/trainer';
import { type PokemonSummary } from '@/lib/schema/pokemon';
import { trainerFormSchema } from '@/lib/schema/trainer';

export function useTrainerRegistrationForm() {
  return useAppForm({
    defaultValues: {
      trainerName: '',
      trainerAge: '' as string | number,
      pokemon: null as PokemonSummary | null,
    },
    validators: {
      onChange: trainerFormSchema,
    },
    onSubmitInvalid: () => {
      const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement;
      InvalidInput?.focus();
    },
    onSubmit: async ({ value }) => {
      const data = trainerFormSchema.parse(value);

      const r = await trainerApi.register({
        name: data.trainerName,
        age: data.trainerAge,
        pokemon: data.pokemon.name,
      });

      if (!r.ok) throw new Error('Failed to register trainer');
    },
  });
}
