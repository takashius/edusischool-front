import { ReactQueryProvider } from "./react-query-provider";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}