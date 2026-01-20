'use client';

import { Button, Stack } from '@mui/material';

import { useFormContext } from '@/hooks/form-context';

export function FormActionButtons() {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Stack direction="row" spacing={2} justifyContent="flex-end" flexWrap="wrap" useFlexGap>
          <Button disabled={isSubmitting} variant="soft" type="reset" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button loading={isSubmitting} variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      )}
    </form.Subscribe>
  );
}
