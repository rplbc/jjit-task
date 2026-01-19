'use client';

import { Box, Chip, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { usePokemonDetailsQuery } from '@/hooks/use-pokemon-details';

import type { PokemonSummary } from '../lib/schema/pokemon';

const Container = styled(Paper)(({ theme }) => ({
  borderColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(3.5),
  minHeight: 254,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SpriteBox = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 160,
    height: 160,
  },
}));

const LabelText = styled('span')(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.primary,
}));

const DetailsList = styled('dl')(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  columnGap: 16,
  rowGap: 14,
  margin: 0,
  [theme.breakpoints.up('sm')]: {
    columnGap: 24,
    rowGap: 18,
  },
}));

const TermText = styled('dt')(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  margin: 0,
  fontWeight: 600,
  [theme.breakpoints.up('sm')]: {
    fontSize: 16,
  },
}));

const ValueText = styled('dd')(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.primary,
  margin: 0,
  [theme.breakpoints.up('sm')]: {
    fontSize: 16,
  },
}));

const ChipRow = styled(Stack)(() => ({
  flexWrap: 'wrap',
  gap: 12,
}));

const TypeChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  fontSize: 14,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.primary,
}));

const SpriteImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

type PokemonDetailsProps = {
  pokemon?: PokemonSummary | null;
};

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const { data: details, isLoading } = usePokemonDetailsQuery(pokemon?.id);

  if (isLoading)
    return (
      <Container variant="outlined">
        <LabelText>Loading...</LabelText>
      </Container>
    );

  if (!details || !details.ok)
    return (
      <Container variant="outlined">
        <LabelText>Your pokemon</LabelText>
      </Container>
    );

  const detailsData = details.data;

  return (
    <Container variant="outlined">
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 6 }} alignItems="center">
        <SpriteBox>
          {detailsData.img ? (
            <SpriteImg src={detailsData.img} alt={detailsData.name} />
          ) : (
            <LabelText>No image</LabelText>
          )}
        </SpriteBox>
        <DetailsList>
          <TermText>Name:</TermText>
          <ValueText>{detailsData.name}</ValueText>

          <TermText>Type:</TermText>
          <ValueText>
            <ChipRow direction="row">
              {detailsData.types.length ? (
                detailsData.types.map((type) => <TypeChip key={type} label={type} />)
              ) : (
                <LabelText>—</LabelText>
              )}
            </ChipRow>
          </ValueText>

          <TermText>Base experience:</TermText>
          <ValueText>{detailsData.base_experience || '—'}</ValueText>

          <TermText>Id:</TermText>
          <ValueText>{detailsData.id || '—'}</ValueText>
        </DetailsList>
      </Stack>
    </Container>
  );
}
