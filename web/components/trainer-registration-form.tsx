'use client';

import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';

import { trainerApi } from '@/lib/api/trainer';
import { type PokemonSummary } from '@/lib/schema/pokemon';
import { trainerFormSchema } from '@/lib/schema/trainer';

import { useAppForm } from './forms/app-form';
import { PokemonDetails } from './pokemon-details';

export function TrainerRegistrationForm() {
  const form = useAppForm({
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

  return (
    <form.AppForm>
      <Stack
        component="form"
        spacing={3}
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit().catch(() => {
            alert('Something went wrong');
          });
        }}
      >
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <form.AppField name="trainerName">
              {(field) => <field.TextField label="Trainer's name" placeholder="Trainer's name" />}
            </form.AppField>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <form.AppField name="trainerAge">
              {(field) => <field.NumberField label="Trainer's age" placeholder="Trainer's age" />}
            </form.AppField>
          </Grid2>
        </Grid2>

        <form.AppField name="pokemon">
          {(field) => <field.PokemonAutocomplete label="Pokemon name" placeholder="Choose" />}
        </form.AppField>

        <form.Subscribe selector={(state) => state.values.pokemon}>
          {(pokemon) => <PokemonDetails pokemon={pokemon} />}
        </form.Subscribe>

        <form.ActionButtons />
        <form.SuccessDialog />
      </Stack>
    </form.AppForm>
  );
}
