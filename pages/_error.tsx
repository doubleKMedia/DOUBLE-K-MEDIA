import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Error: NextPage<{ statusCode: number | undefined }> = ({ statusCode }) => {
  const TITLE = statusCode ?? 400;
  const DESCRIPTION = '에러가 발생하였습니다.';

  return (
    <Layout title={TITLE.toString()} description={DESCRIPTION} mode={'dark'}>
      <h1>페이지가 존재하지 않습니다. code: {TITLE}</h1>
      <style jsx>
        {`
          h1 {
            padding: 200px;
          }
        `}
      </style>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
