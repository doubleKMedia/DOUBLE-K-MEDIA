import Head from 'next/head';
import { ReactNode } from 'react';

const Layout = ({ children, title, description }: { children: ReactNode; title: string; description: string }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title} | 더블케이미디어</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav></nav>

      <main>{children}</main>

      <footer></footer>

      <style jsx>
        {`
          .layout {
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
