import { NextPage } from 'next';
import Layout from '../../components/Layout';
import PortfolioCard from '../../components/portfolio/PortfolioCard';
import portfolioInfo from './portfolioInfo.json';

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
        <div className="list">
          <ul>
            {portfolioInfo.map((info, i) => (
              <PortfolioCard info={info} key={i} />
            ))}
          </ul>
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
            padding: 200px 0 0 0;
          }

          .head {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 10px;
          }

          .head > span:nth-child(1) {
            font-size: 30px;
            color: #6cc26c;
          }

          .head > span:nth-child(2) {
            font-size: 14px;
            color: #888888;
          }

          .list {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 50px 100px;
            background-color: #ebf4eb;
          }

          .list > ul {
            width: 100%;
            display: grid;
            justify-items: center;
            column-gap: 40px;
            row-gap: 60px;
            grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
          }

          @media screen and (max-width: 550px) {
            div.list {
              padding-left: 0;
              padding-right: 0;
            }
          }

          @media screen and (max-width: 350px) {
            .list > ul {
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default Portfolio;
