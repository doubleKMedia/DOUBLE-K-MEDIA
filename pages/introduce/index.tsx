import { NextPage } from 'next';
import Image from 'next/image';
import CompanyCard from '../../components/introduce/CompanyCard';
import Map from '../../components/introduce/Map';
import Layout from '../../components/Layout';
import companyCardList from './companyCardList.json';

type IntroducePropsType = {
  CLIENT_ID: string;
};

const Introduce: NextPage<IntroducePropsType> = (Props: IntroducePropsType) => {
  const TITLE = 'Introduce';
  const DESCRIPTION = '더블케이미디어의 자세한 정보를 소개합니다.';
  const { CLIENT_ID } = Props;

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode="dark">
      <div className="introduce">
        <div className="head">
          <span>회사소개</span>
          <span>성공 길잡이 DOUBLE K MEDIA를 소개합니다.</span>
        </div>
        <div className="company">
          <div className="cards">
            {companyCardList.map(({ title, point, sub }, i) => (
              <CompanyCard title={title} point={point} sub={sub} key={i} />
            ))}
          </div>
          <button className="download" onClick={() => alert('회사소개서 다운')}>
            회사소개서
            <br />
            다운로드
          </button>
        </div>
        <div className="vision">
          <div className="title">
            <span>Vision</span>
            <span>광고주분의 마음을 읽고 인연을 소중히 하며 더블케이미디어의 그릇을 채워나가겠습니다.</span>
          </div>
          <div className="order">
            <div>
              <Image src="/introduce/vision5.svg" width={200} height={200} alt="젊은 감각" />
              <span>젊은 감각</span>
            </div>
            <div>
              <Image src="/introduce/vision4.svg" width={250} height={200} alt="최상의 솔루션" />
              <span>최상의 솔루션</span>
            </div>
            <div>
              <Image src="/introduce/vision3.svg" width={250} height={200} alt="전문가의 노하우" />
              <span>전문가의 노하우</span>
            </div>
            <div>
              <Image src="/introduce/vision2.svg" width={250} height={200} alt="트랜디한 전략" />
              <span>트랜디한 전략</span>
            </div>
            <div>
              <Image src="/introduce/vision1.svg" width={250} height={200} alt="고객 중심" />
              <span>고객중심</span>
            </div>
          </div>
        </div>
        <div className="location">
          <span>오시는 길</span>
          <div className="info">
            <div className="map">{CLIENT_ID === '' ? '' : <Map CLIENT_ID={CLIENT_ID} />}</div>
            <div className="transportation">
              <div className="subway">
                <span>
                  <Image src="/introduce/train.png" width={20} height={20} alt="subway" />
                  지하철
                </span>
                <span>내용</span>
              </div>
              <div className="bus">
                <span>
                  <Image src="/introduce/bus.png" width={20} height={20} alt="bus" />
                  버스
                </span>
                <span>내용</span>
              </div>
              <div className="car">
                <span>
                  <Image src="/introduce/taxi.png" width={20} height={20} alt="car" />
                  자가용
                </span>
                <span>내용</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .introduce {
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
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .head > span:nth-child(1) {
            font-size: 30px;
          }

          .head > span:nth-child(2) {
            font-size: 15px;
            color: #888888;
          }

          .company {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 100px 0;
          }

          .company::after {
            content: '';
            width: 350px;
            height: 350px;
            border: 1px solid rgba(108, 194, 108, 0.2);
            border-radius: 50%;
          }

          .company::before {
            content: '';
            position: absolute;
            width: 270px;
            height: 270px;
            background-color: rgba(108, 194, 108, 0.2);
            border: 2px dotted rgba(108, 194, 108);
            border-radius: 50%;
          }

          .cards {
            position: absolute;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            width: 880px;
            row-gap: 100px;
            z-index: 1;
          }

          .download {
            position: absolute;
            background-image: linear-gradient(to bottom right, #6cc26c, #b2e8e4);
            width: 170px;
            height: 170px;
            border-radius: 50%;
            z-index: 2;
            color: white;
            font-size: 17px;
            font-weight: bold;
          }

          .vision {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px 0 200px 0;
            background-color: rgba(108, 194, 108, 0.2);
            width: 100%;
          }

          .vision::before {
            content: '';
            width: 600px;
            height: 300px;
            border-radius: 300px 300px 0 0;
            background-color: white;
          }

          .title {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
          }

          .title > span:nth-child(1) {
            font-size: 30px;
          }

          .title > span:nth-child(2) {
            font-size: 12px;
          }

          .order {
            position: absolute;
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
            align-items: center;
            transform: translateY(200px);
          }

          .order > div {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 -30px;
          }

          .order > div > span {
            transform: translateX(-25px) translateY(15px);
            color: #6cc26c;
          }

          .order > div:nth-child(1) > span {
            transform: translateY(15px);
          }

          .location {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            width: 100%;
            height: 500px;
            padding-top: 200px;
          }

          .location > span {
            font-size: 24px;
          }

          .info {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            width: 100%;
          }

          .map {
            position: relative;
            width: 350px;
            height: 400px;
            background-color: white;
            border-radius: 30px;
            overflow: hidden;
          }

          .transportation {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            gap: 20px;
          }

          .transportation > div {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            background-color: white;
            width: 350px;
            height: 100%;
            border-radius: 30px;
            padding: 20px;
          }

          .transportation > div > span:nth-child(1) {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 5px;
            width: 100px;
            color: #6cc26c;
          }

          .transportation > div > span:nth-child(2) {
            font-size: 14px;
          }
        `}
      </style>
    </Layout>
  );
};

export default Introduce;

export const getStaticProps = () => {
  const CLIENT_ID = process.env.NAVER_CLIENT_ID ?? '';

  return {
    props: {
      CLIENT_ID,
    },
  };
};
