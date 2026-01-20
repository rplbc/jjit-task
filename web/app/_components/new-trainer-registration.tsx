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
        p: 4,
        my: 4,
        mx: 'auto',
        width: 'calc(100% - 64px)',
        maxWidth: '544px',
      }}
    >
      <Stack spacing={3}>
        {date ? (
          <Typography align="right" variant="subtitle1" component="p">
            <FormattedDate>{date}</FormattedDate>
          </Typography>
        ) : null}
        <TrainerRegistrationForm />
      </Stack>
    </Paper>
  );
}
