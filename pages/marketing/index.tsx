import { NextPage } from 'next';
import Layout from '../../components/Layout';

const Marketing: NextPage = () => {
  const TITLE = 'Marketing';
  const DESCRIPTION = '더블케이미디어에게 마케팅 견적에 대해 문의합니다.';

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode="dark">
      <div className="marketing">
        <div className="head">
          <span>마케팅 견적문의</span>
          <span>
            클라이언트의 온라인 마케팅 방향에 따라 맞춤제안서를 발송해드립니다.
            <br />
            연락처를 남겨주시면 업무일 기준 24시간내에 담당자가 연락드립니다.
          </span>
        </div>
        <div className="input-document">
          <div className="box"></div>
        </div>
      </div>

      <style jsx>
        {`
          .marketing {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 200px 0 0 0;
            background-color: #f9f9f9;
          }

          .head {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-bottom: 50px;
          }

          .head > span:nth-child(1) {
            font-size: 30px;
            color: #6cc26c;
          }

          .head > span:nth-child(2) {
            font-size: 14px;
            color: #888888;
            text-align: center;
          }

          .input-document {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ebf4eb;
            width: 100%;
            padding: 100px;
          }

          .box {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            width: 100%;
            background-color: white;
            border-radius: 80px;
            box-shadow: 1px 1px 20px rgba(112, 112, 112, 0.05), 1px -1px 20px rgba(112, 112, 112, 0.05), -1px 1px 20px rgba(112, 112, 112, 0.05),
              -1px -1px 20px rgba(112, 112, 112, 0.05);
            padding: 80px;

            height: 500px;
          }
        `}
      </style>
    </Layout>
  );
};

export default Marketing;
