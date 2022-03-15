import { NextPage } from 'next';
import ScrollListView from '../../components/website/ScrollListView';
import WebsiteLayout from '../../components/website/WebsiteLayout';
import scrollListData from './shopping-mall/scrollListData.json';

const ShoppingMall: NextPage = () => {
  return (
    <WebsiteLayout>
      <div className="homepage">
        <article className="customized">
          <div className="head">
            <span>경쟁사보다 앞선 나만의 홈페이지</span>
            <span>#맞춤형</span>
            <span>
              동일한 UI/UX 환경에서 차별화 된 가치 창출을 가능하게 하고 소개 · 홍보 · 전환 등의
              <br />
              홈페이지 구축 목적을 이루는 방법을 제시하여 성공에 대한 비전을 제시합니다.
            </span>
          </div>
          <ScrollListView listData={scrollListData} link="/website/project-inquiry" />
        </article>
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

          .customized {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            box-sizing: border-box;
            padding: 100px 0 0 0;
            background-color: #f9f9f9;
          }

          .customized > .head {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .customized > .head > span:nth-child(1) {
            font-size: 20px;
          }

          .customized > .head > span:nth-child(2) {
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .customized > .head > span:nth-child(3) {
            color: #6a6a6a;
          }

          .customized {
            background-color: white;
          }
        `}
      </style>
    </WebsiteLayout>
  );
};

export default ShoppingMall;
