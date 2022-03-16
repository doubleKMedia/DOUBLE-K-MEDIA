import { NextPage } from 'next';
import LineListView from '../../../components/website/LineListView';
import WebsiteLayout from '../../../components/website/WebsiteLayout';
import lineListData from './lineListData.json';

const Sample: NextPage = () => {
  return (
    <WebsiteLayout>
      <div className="sample">
        <div className="head">
          <span>샘플 보기</span>
          <span>더블케이미디어 작업물 샘플</span>
        </div>
        <LineListView listData={lineListData} />
      </div>

      <style jsx>
        {`
          .sample {
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

export default Sample;
