'use client';

import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { usePokemonDetailsQuery } from '@/hooks/use-pokemon-details';
import type { PokemonSummary } from '@/lib/schema/pokemon';

const Container = styled(Paper)({
  minHeight: 254,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

type PokemonDetailsProps = {
  pokemon?: PokemonSummary | null;
};

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const { data: details, isFetching } = usePokemonDetailsQuery(pokemon?.id);

  if (isFetching)
    return (
      <Container variant="outlined">
        <Typography variant="body2">Loading...</Typography>
      </Container>
    );

  if (!details || !details.ok)
    return (
      <Container variant="outlined">
        <Typography variant="body2">Your pokemon</Typography>
      </Container>
    );

  const detailsData = details.data;

  return (
    <Container variant="outlined">
      <Stack
        direction="row"
        p={4}
        spacing={3}
        sx={{ flexWrap: 'wrap' }}
        alignItems="center"
        justifyContent="center"
        useFlexGap
      >
        {detailsData.img ? (
          <Box
            component="img"
            src={detailsData.img}
            alt={detailsData.name}
            sx={{
              width: 194,
              height: 196,
              objectFit: 'contain',
              color: 'transparent',
            }}
          />
        ) : null}

        <Stack spacing={2}>
          <div>Name: {detailsData.name}</div>
          <div>
            Type:{' '}
            <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }} gap={1}>
              {detailsData.types.map((type) => (
                <Chip key={type} label={type} sx={{ bgcolor: 'primary.light' }} />
              ))}
            </Box>
          </div>
          <div>Base experience: {detailsData.base_experience}</div>
          <div>Id: {detailsData.id}</div>
        </Stack>
      </Stack>
    </Container>
  );
}
