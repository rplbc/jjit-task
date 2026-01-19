'use client';

import { Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';

import { useFormContext } from '@/hooks/form-context';

export function FormSuccessDialog() {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitSuccessful}>
      {(isSubmitSuccessful) => (
        <Dialog
          open={isSubmitSuccessful}
          onClose={() => {
            form.reset();
          }}
          aria-labelledby="form-success-title"
          slotProps={{
            paper: {
              sx: {
                p: '36px',
                maxWidth: '100%',
                width: '380px',
              },
            },
          }}
        >
          <Stack justifyContent="center" alignItems="center" textAlign="center" spacing={1}>
            <DialogTitle id="form-success-title">Sukces!</DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  form.reset();
                }}
              >
                Reset form
              </Button>
            </DialogActions>
          </Stack>
        </Dialog>
      )}
    </form.Subscribe>
  );
}
