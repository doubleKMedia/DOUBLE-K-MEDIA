import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const TITLE = 'Home';
  const DESCRIPTION = '더블케이미디어는 온라인과 오프라인의 경계를 뛰어넘는 최고의 광고 컨설팅을 약속합니다.';

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <div className="home"></div>
      <style jsx>
        {`
          .home {
          }
        `}
      </style>
    </Layout>
  );
};

export default Home;
