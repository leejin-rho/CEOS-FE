import { Layout } from '@admin/components/Layout';
import '@admin/styles/globals.css';
import { globalStyle, theme } from '@ceos-fe/ui';
import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
