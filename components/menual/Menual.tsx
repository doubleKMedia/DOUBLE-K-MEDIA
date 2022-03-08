import Head from 'next/head';
import { ReactNode } from 'react';

const Menual = ({ children, title, description }: { children: ReactNode; title: string; description: string }) => {
  return (
    <main>
      <Head>
        <title>{title} | 더블케이미디어</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>{children}</section>

      <style jsx>
        {`
          main {
            position: relative;
            display: flex;
            justify-content: center;
            width: 100%;
            background-color: #333333;
          }

          section {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 50px;
            background-color: whitesmoke;
            width: 900px;
            margin: 100px 0px;
            padding: 50px;
          }
        `}
      </style>
    </main>
  );
};

export default Menual;
