import { systemApi } from '../lib/system-api';

export default async function Home() {
  const result = await systemApi.getTime();

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
