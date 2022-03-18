import type { NextPage } from 'next';
import Image from 'next/image';
import { createRef, useEffect, useState } from 'react';
import OrderCard from '../components/home/OrderCard';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const TITLE = 'Home';
  const DESCRIPTION = '더블케이미디어는 온라인과 오프라인의 경계를 뛰어넘는 최고의 광고 컨설팅을 약속합니다.';
  const [mode, setMode] = useState<'dark' | 'light'>('light');
  const bannerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const scrollDetection = () => {
      const target = bannerRef.current;
      if (!target) return;
      const isOver = target.offsetHeight + target.getBoundingClientRect().y < 50;
      if (mode === 'light' && isOver) setMode('dark');
      else if (mode === 'dark' && !isOver) setMode('light');
    };

    scrollDetection();

    window.addEventListener('scroll', scrollDetection);

    return () => {
      window.removeEventListener('scroll', scrollDetection);
    };
  }, [mode, bannerRef]);

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode={mode}>
      <div className="home">
        <div className="banner" ref={bannerRef}>
          <div className="banner-image">
            <Image src="/home/home_bg.png" layout="fill" objectFit="cover" alt="home banner background" priority />
          </div>
          <span className="ment" onClick={() => setMode('dark')}>
            우리는
            <br />
            <strong>{"'광고주의 입장'"}</strong>에서
            <br />
            생각하고 행동합니다.
          </span>
        </div>
        <div className="intro">
          <Image className="logo" src="/home/home_logo.png" width={150} height={150} alt="home intro logo" />
          <div className="intro-ment">
            <span className="top">
              더블케이미디어는
              <br />
              온라인과 오프라인의 경계를 뛰어넘는 <strong>최고의 광고 컨설팅을 약속</strong>합니다.
            </span>
            <span className="body">
              겪어본 대행사는 많지만 똑같은 전략에 지치셨나요?
              <br />
              마케팅의 첫 단추를 어떻게 꿰어야 할지 고민인가요?
              <br />
              제대로 된 마케팅을 하고 싶은 여러분, 잘 오셨습니다!
              <br />
              -<br />
              이곳은 전문적이고 트렌디한 마케터들이 모인 곳.
              <br />
              DOUBLE K MEDIA는 넓은 통찰력과 체계적인 프로세스의 마케팅 기술로
              <br />
              기존 광고대행사와는 차별화된 성과를 선보입니다.
              <br />
            </span>
          </div>
        </div>
        <div className="course-introduction">
          <span className="title-ment">
            DOUBLE K MEDIA는<strong>이렇게 일합니다</strong>
          </span>
          <OrderCard src="/null.png" direction="left" number={1} title="인사이트 분석" isLast={false}>
            시장 현황, 자사/경쟁사 비교, 타겟 등<br />
            다양한 인사이트를 분석하여
            <br />
            정확한 마케팅 방향 설정을 위한 뼈대 구축
          </OrderCard>
          <OrderCard src="/null.png" direction="right" number={2} title="마케팅 전략 도출" isLast={false}>
            브랜드에 관한 인사이트를 토대로
            <br />
            마케팅 방향 설정 및 차별화된 마케팅 포인트 발굴
          </OrderCard>
          <OrderCard src="/null.png" direction="left" number={3} title="커뮤니케이션 컨셉 개발" isLast={false}>
            브랜드 이미지와 타겟의 니즈를 기반으로
            <br />
            주요 타겟을 공략하기 위한 커뮤니케이션 컨셉 및 메시지 개발
          </OrderCard>
          <OrderCard src="/null.png" direction="right" number={4} title="캠페인 전략 설정" isLast={false}>
            캠페인 목표를 수립하고 목표 달성을 위한
            <br />
            장/단기 캠페인 마케팅 전략 설정
          </OrderCard>
          <OrderCard src="/null.png" direction="left" number={5} title="미디어 선정" isLast={false}>
            각 미디어가 보유한 타겟팅 기술, 노출 지면 등을 고려하여
            <br />
            설정한 캠페인 전략에 최적화된 매체 선정
          </OrderCard>
          <OrderCard src="/null.png" direction="right" number={6} title="운영 및 보고" isLast={true}>
            지속적인 성과 개선을 위한 효율 기반의 매체 운영,
            <br />
            캠페인 운영 성과에 대한 정기적인 데이터 분석 및 보고
          </OrderCard>
        </div>
        <div className="skills">
          <span className="skills-ment">
            <strong>왜</strong> DOUBLE K MEDIA를 <strong>선택해야 할까요?</strong>
          </span>
          <div className="skill-imgs">
            <div className="skill">
              <span className="skill-name">넓은 시야</span>
              <span className="skill-img">
                <Image src="/home/home_wide_vision.png" layout="fill" alt="wide vision" />
              </span>
            </div>
            <div className="skill">
              <span className="skill-name">깊은 공감</span>
              <span className="skill-img">
                <Image src="/home/home_deep_empathy.png" layout="fill" alt="deep empathy" />
              </span>
            </div>
            <div className="skill">
              <span className="skill-name">젊은 감각</span>
              <span className="skill-img">
                <Image src="/home/home_young_sense.png" layout="fill" alt="young sense" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .home {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            background-color: #f9f9f9;
          }

          .banner {
            position: relative;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
          }

          .banner-image {
            position: relative;
            width: 100%;
            height: 100%;
            filter: brightness(0.5);
          }

          .ment {
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 70px;
            color: white;
            transform: translate(10vw, -100px);
          }

          .intro {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: clamp(50px, 5vw, 200px);
            width: 100%;
            padding: 100px 0;
          }

          .logo {
            border-radius: 50%;
          }

          .intro-ment {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 30px;
          }

          .intro-ment > span {
            white-space: nowrap;
          }

          .top {
            font-size: 24px;
            font-weight: bold;
          }

          .body {
            font-size: 15px;
            line-height: 25px;
          }

          .title-ment {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 35px;
            font-weight: bold;
            margin-bottom: 60px;
          }

          .skills {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
            margin: 100px 0;
          }

          .skills-ment {
            font-size: 35px;
            font-weight: bold;
          }

          .top > strong,
          .title-ment > strong,
          .skills-ment > strong {
            color: #6cc26c;
          }

          .skill-imgs {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
          }

          .skill {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 250px;
            height: 150px;
            border-radius: 20px;
            overflow: hidden;
          }

          .skill > .skill-name {
            position: absolute;
            font-size: 24px;
            color: whitesmoke;
            z-index: 1;
          }

          .skill-img {
            position: relative;
            width: 100%;
            height: 100%;
            filter: brightness(0.6);
          }

          @media screen and (max-width: 1050px) {
            div.intro {
              flex-direction: column;
            }
          }

          @media screen and (max-width: 920px) {
            span.ment {
              font-size: min(8vw, 70px);
              bottom: 25%;
            }

            div.intro-ment {
              align-items: center;
            }

            span.top {
              text-align: center;
              white-space: normal !important;
              font-size: max(2.5vw, 20px);
              word-break: keep-all;
              padding: 0 5vw;
            }

            span.body {
              text-align: center;
              white-space: normal !important;
              padding: 0 5vw;
            }

            span.title-ment,
            span.skills-ment {
              font-size: max(4vw, 20px);
              padding: 0 20px;
              text-align: center;
            }

            div.skill-imgs {
              flex-direction: column;
              padding: 0 20px;
            }
          }

          @media screen and (max-width: 400px) {
            span.title-ment {
              flex-direction: column;
            }

            div.skill-imgs {
              gap: 10vw;
            }

            div.skill {
              width: 62.5vw;
              height: 37.5vw;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default Home;
