import { NextPage } from 'next';
import LineListView from '../../../components/website/LineListView';
import WebsiteLayout from '../../../components/website/WebsiteLayout';
import lineListData from './lineListData.json';

const Design: NextPage = () => {
  return (
    <WebsiteLayout>
      <div className="design">
        <div className="head">
          <span>기타 디자인 샘플</span>
          <span>
            홈페이지 배너, SNS 배너, 상세페이지, 브랜딩 작업 등의 디자인 작업입니다.
            <br />
            해당 작업은 별도 문의 주시기 바랍니다.
          </span>
        </div>
        <LineListView listData={lineListData} />
      </div>

      <style jsx>
        {`
          .design {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 100px 0;
          }

          .head {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            text-align: center;
          }

          .head > span:nth-child(1) {
            font-size: 30px;
            font-weight: bold;
          }

          .head > span:nth-child(2) {
            font-size: 18px;
            color: #6a6a6a;
          }
        `}
      </style>
    </WebsiteLayout>
  );
};

export default Design;
