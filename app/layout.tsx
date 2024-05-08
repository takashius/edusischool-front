import { ReactQueryProvider } from "./react-query-provider";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}