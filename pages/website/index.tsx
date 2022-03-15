import { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout';

const Website: NextPage = () => {
  const TITLE = 'Website creation inquiry';
  const DESCRIPTION = '더블케이미디어가 제시하는 홈페이지 제작 템플릿을 보고 문의를 합니다.';

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode="light">
      <div className="homepage">
        <div className="banner">
          <Image src={'/website/website_banner.png'} layout="fill" objectFit="cover" />
        </div>
      </div>

      <style jsx>
        {`
          .homepage {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </Layout>
  );
};

export default Website;
