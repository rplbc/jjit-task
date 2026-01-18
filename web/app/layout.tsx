import { Web437Font } from '../styles/fonts';
import { Providers } from './_components/providers';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={Web437Font.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
