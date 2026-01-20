'use client';

import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Grid2';

import { useTrainerRegistrationForm } from '@/hooks/use-trainer-registration-form';

import { PokemonDetails } from './pokemon-details';

export function TrainerRegistrationForm() {
  const form = useTrainerRegistrationForm();

  return (
    <form.AppForm>
      <Stack
        component="form"
        spacing={3}
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit().catch(() => {
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
