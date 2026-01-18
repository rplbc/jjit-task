'use client';

import { Paper, Stack, Typography } from '@mui/material';

import { TrainerRegistrationForm } from '@/components/trainer-registration-form';

type NewTrainerRegistrationProps = {
  date: React.ReactNode;
};

export function NewTrainerRegistration({ date }: NewTrainerRegistrationProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '36px',
        margin: '36px',
        maxWidth: '544px',
        marginInline: 'auto',
      }}
    >
      <Stack spacing={3}>
        {date ? <Typography align="right">{date}</Typography> : null}
        <TrainerRegistrationForm />
      </Stack>
    </Paper>
  );
}
