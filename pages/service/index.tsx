import { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout';
import ServiceCard, { cardInfoType } from '../../components/service/ServiceCard';
import serviceList from './serviceList.json';

const Service: NextPage = () => {
  const TITLE = 'Service';
  const DESCRIPTION = '더블케이미디어가 제공하는 다양한 서비스의 목록을 볼 수 있는 페이지입니다.';
  const cardInfos: cardInfoType[] = serviceList;

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode="dark">
      <div className="service">
        <div className="head">
          <span>서비스</span>
          <span>Double K Media는 다양한 디지털 광고 매체사와 함께 합니다.</span>
        </div>
        <div className="cards">
          <ServiceCard cardInfo={cardInfos[0]}>
            <div className="default">
              <p>
                <Image src="/google.png" width={12} height={12} alt="google" />
                <strong>구글</strong>구글검색
              </p>
              <p>
                <Image src="/kakko.png" width={12} height={12} alt="kakko" />
                <strong>카카오</strong>브랜딩DA, 타임보드
              </p>
              <p>
                <Image src="/naver.png" width={12} height={12} alt="naver" />
                <strong>네이버</strong>브랜드검색, 파워링크, 파워컨텐츠, 쇼핑검색
              </p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[1]}>
            <div className="center">
              <p>
                <Image src="/instagram.png" width={12} height={12} alt="instagram" />
                <strong>인스타그램,</strong>
                <Image src="/facebook.png" width={12} height={12} alt="facebook" />
                <strong>페이스북,</strong>
              </p>
              <p>
                <Image src="/tiktok.png" width={12} height={12} alt="tiktok" />
                <strong>틱톡,</strong>
                <Image src="/zigzag.png" width={12} height={12} alt="zigzag" />
                <strong>지그재그</strong>
              </p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[2]}>
            <div className="default">
              <p>
                <Image src="/naver.png" width={12} height={12} alt="naver" />
                <strong>네이버</strong>브랜딩DA, 타임보드
              </p>
              <p>
                <Image src="/nate.png" width={12} height={12} alt="nate" />
                <strong>네이트</strong>메인 홈페이지 배너
              </p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[3]}>
            <div className="center">
              <p>
                <Image src="/naver_webtoon.png" width={12} height={12} alt="naver webtoon" />
                <strong>네이버 웹툰,</strong>
                <Image src="/kakko_webtoon.png" width={12} height={12} alt="kakko webtoon" />
                <strong>카카오 웹툰</strong>
              </p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[4]}>
            <div className="default">
              <p>
                <Image src="/naver.png" width={12} height={12} alt="naver" />
                <strong>네이버</strong>네이버GFA (모바일메인/서브/스마트채널)
              </p>
              <p>
                <Image src="/kakko.png" width={12} height={12} alt="kakko" />
                <strong>카카오</strong>카카오모먼트, 비즈보드, 모비온/크리테오/GDN/ADN/타게팅게이츠 등
              </p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[5]}>
            <div className="default">
              <p>인플루언서 : SNS 및 네이버</p>
              <p>블로그/카페 : 포털매체</p>
              <p>언론배포 : 브랜딩DA, 타임보드</p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[6]}>
            <div className="center">
              <p>
                <Image src="/youtube.png" width={12} height={12} alt="youtube" />
                <strong>유튜브,</strong>
                <Image src="/nitmus.png" width={12} height={12} alt="nitmus" />
                <strong>니트머스</strong>
              </p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[7]}>
            <div className="center">
              <p>DB 수집 페이지, 브랜딩 페이지, 쇼핑몰</p>
            </div>
          </ServiceCard>
          <ServiceCard cardInfo={cardInfos[8]}>
            <div className="center">
              <p>핸드폰 DB, 보험 DB, 자동차 DB, 견적 DB, 렌탈 DB</p>
            </div>
          </ServiceCard>
        </div>
      </div>

      <style jsx>
        {`
          .service {
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
            text-align: center;
          }

          .cards {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 50px;
            padding: 50px;
            word-break: keep-all;
            line-height: 20px;
          }

          .cards .default,
          .cards .center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            height: 100%;
          }

          .cards div strong {
            margin: 0 5px;
          }

          .cards .center {
            align-items: center;
          }

          @media screen and (max-width: 350px) {
            div.cards {
              gap: 0;
              padding: 0;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default Service;
