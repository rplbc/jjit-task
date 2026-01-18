import type { Metadata } from 'next';

import { systemApi } from '@/lib/api/system';

import { NewTrainerRegistration } from './_components/new-trainer-registration';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trainer Registration',
  description: 'Register as a trainer',
};

export default async function Home() {
  const dateResponse = await systemApi.getTime();
  const date = dateResponse.ok ? dateResponse.data.time : null;

  return <NewTrainerRegistration date={date} />;
}
