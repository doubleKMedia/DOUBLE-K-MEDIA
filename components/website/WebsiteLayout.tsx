import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createRef, ReactNode, useEffect, useState } from 'react';
import Layout from '../Layout';
import navRoutes from '../navRoutes.json';

const navList = navRoutes.find((list) => list.head.name === '홈페이지 제작문의');

const WebsiteLayout = ({ children }: { children: ReactNode }) => {
  const TITLE = 'Website creation inquiry';
  const DESCRIPTION = '더블케이미디어가 제시하는 홈페이지 제작 템플릿을 보고 문의를 합니다.';
  const { route } = useRouter();
  const [, root, path] = route.split('/');
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
      <div className="homepage">
        <div className="banner" ref={bannerRef}>
          <div className="banner-img">
            <Image src={'/website/website_banner.png'} layout="fill" objectFit="cover" alt="website banner" priority />
          </div>
          <div className="head">
            <span>홈페이지 제작문의</span>
            <span>최신 트렌드를 따라가는 감각적인 디자인</span>
          </div>
          <nav className="sub-nav">
            {navList?.list.map(({ href, name }, i) => (
              <Link href={`/${root}/${href}`} key={i}>
                <a className={path === href ? 'open' : ''}>{name}</a>
              </Link>
            ))}
          </nav>
        </div>
        {children}
      </div>

      <style jsx>
        {`
          .homepage {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .banner {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 400px;
            z-index: 1;
          }

          .banner-img {
            position: relative;
            width: 100%;
            height: 100%;
            filter: brightness(0.5);
          }

          .head {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            color: white;
            transform: translateY(30px);
          }

          .head > span:nth-child(1) {
            font-size: clamp(20px, 5vw, 40px);
          }

          .head > span:nth-child(2) {
            font-size: min(2.5vw, 19px);
          }

          .sub-nav {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: min(2vw, 30px);
            bottom: 0;
            transform: translateY(50%);
          }

          .sub-nav > a {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #c6c6c6;
            font-size: min(1.5vw, 18px);
            width: min(12vw, 140px);
            height: min(4vw, 50px);
            color: #666666;
            border-radius: 30px;
          }

          .sub-nav > a.open {
            background-color: #6cc26c;
            color: #f9f9f9;
          }

          @media screen and (max-width: 700px) {
            .sub-nav {
              display: none;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default WebsiteLayout;
