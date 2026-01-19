import { z } from 'zod';

import { POKEMON_ID_MIN, POKEMON_NAME_MIN } from './pokemon';

export const TRAINER_NAME_MIN = 2;
export const TRAINER_NAME_MAX = 20;
export const TRAINER_AGE_MIN = 16;
export const TRAINER_AGE_MAX = 99;

export const TRAINER_NAME_RANGE_MESSAGE = `Required from ${TRAINER_NAME_MIN} to ${TRAINER_NAME_MAX} symbols`;
export const TRAINER_AGE_RANGE_MESSAGE = `Required range from ${TRAINER_AGE_MIN}-${TRAINER_AGE_MAX}`;
export const CHOOSE_POKEMON_MESSAGE = 'Choose something';

export const trainerSchema = z.object({
  name: z.string().min(TRAINER_NAME_MIN).max(TRAINER_NAME_MAX),
  age: z.number().int().min(TRAINER_AGE_MIN).max(TRAINER_AGE_MAX),
  pokemon: z.string().min(POKEMON_NAME_MIN),
});

export type Trainer = z.infer<typeof trainerSchema>;

export const trainerFormSchema = z.object({
  trainerName: z
    .string()
    .min(TRAINER_NAME_MIN, TRAINER_NAME_RANGE_MESSAGE)
    .max(TRAINER_NAME_MAX, TRAINER_NAME_RANGE_MESSAGE),
  trainerAge: z.coerce
    .number({
      invalid_type_error: TRAINER_AGE_RANGE_MESSAGE,
    })
    .min(TRAINER_AGE_MIN, TRAINER_AGE_RANGE_MESSAGE)
    .max(TRAINER_AGE_MAX, TRAINER_AGE_RANGE_MESSAGE),
  pokemon: z.object(
    {
      id: z.number().int().min(POKEMON_ID_MIN, CHOOSE_POKEMON_MESSAGE),
      name: z.string().min(POKEMON_NAME_MIN, CHOOSE_POKEMON_MESSAGE),
    },
    {
      invalid_type_error: CHOOSE_POKEMON_MESSAGE,
    },
  ),
});

export type TrainerForm = z.infer<typeof trainerFormSchema>;
