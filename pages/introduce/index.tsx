import { NextPage } from 'next';
import Layout from '../../components/Layout';

const Introduce: NextPage = () => {
  const TITLE = 'Introduce';
  const DESCRIPTION = '더블케이미디어의 자세한 정보를 소개합니다.';

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode="dark">
      <div className="introduce"></div>

      <style jsx>
        {`
          .introduce {
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
          }
        `}
      </style>
    </Layout>
  );
};

export default Introduce;
