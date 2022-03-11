import { NextPage } from 'next';
import Layout from '../../components/Layout';

const Portfolio: NextPage = () => {
  const TITLE = 'Portfolio';
  const DESCRIPTION = '더블케이미디어가 만들어온 작품을 소개합니다.';

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode="dark">
      <div className="portfolio">
        <div className="head">
          <span>포트폴리오</span>
          <span>DOUBLE K MEDIA와 함께 성공한 클라이언트를 소개합니다.</span>
        </div>
      </div>

      <style jsx>
        {`
          .portfolio {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 100px;
            background-color: #f9f9f9;
            padding: 200px 0;
          }

          .head {
          }
        `}
      </style>
    </Layout>
  );
};

export default Portfolio;
