import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import Nav from './Navigator';

const Layout = ({ children, title, description, mode }: { children: ReactNode; title: string; description: string; mode: 'dark' | 'light' }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title} | 더블케이미디어</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav mode={mode} />

      <main>{children}</main>

      <Footer />

      <style jsx>
        {`
          .layout {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-x: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
