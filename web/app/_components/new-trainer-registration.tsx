import { Paper, Stack, Typography } from '@mui/material';

import { FormattedDate } from '@/components/formatted-date';
import { TrainerRegistrationForm } from '@/components/trainer-registration-form';

type NewTrainerRegistrationProps = {
  date?: string | null;
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
        {date ? (
          <Typography align="right">
            <FormattedDate>{date}</FormattedDate>
          </Typography>
        ) : null}
        <TrainerRegistrationForm />
      </Stack>
    </Paper>
  );
}
