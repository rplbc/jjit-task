'use client';

import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { z } from 'zod';

import { trainerApi } from '../lib/api/trainer';

import { useAppForm } from './forms/app-form';
import { PokemonDetails } from './pokemon-details';

const trainerFormSchema = z.object({
  trainerName: z
    .string()
    .min(2, 'Required from 2 to 20 symbols')
    .max(20, 'Required from 2 to 20 symbols'),
  trainerAge: z.coerce
    .number({
      invalid_type_error: 'Required range from 16-99',
    })
    .min(16, 'Required range from 16-99')
    .max(99, 'Required range from 16-99'),
  pokemonName: z.string().min(1, 'Choose something'),
});

export function TrainerRegistrationForm() {
  const form = useAppForm({
    defaultValues: {
      trainerName: '',
      trainerAge: '' as string | number,
      pokemonName: '',
    },
    validators: {
      onChange: trainerFormSchema,
    },
    onSubmit: async ({ value }) => {
      const data = trainerFormSchema.parse(value);

      const r = await trainerApi.register({
        name: data.trainerName,
        age: data.trainerAge,
        pokemon: data.pokemonName,
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

        <form.AppField name="pokemonName">
          {(field) => <field.PokemonAutocomplete label="Pokemon name" placeholder="Choose" />}
        </form.AppField>

        <form.Subscribe selector={(state) => state.values.pokemonName}>
          {(pokemonName) => <PokemonDetails pokemonName={pokemonName} />}
        </form.Subscribe>

        <form.ActionButtons />
        <form.SuccessDialog />
      </Stack>
    </form.AppForm>
  );
}
