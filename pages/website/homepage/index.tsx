import { NextPage } from 'next';
import ScrollListView from '../../../components/website/ScrollListView';
import SideListView from '../../../components/website/SideListView';
import WebsiteLayout from '../../../components/website/WebsiteLayout';
import sideListData from './sideListData.json';
import scrollListData from './scrollListData.json';

const Homepage: NextPage = () => {
  return (
    <WebsiteLayout>
      <div className="homepage">
        <article className="template">
          <div className="head">
            <span>고민할 필요 없이 빠르고 저렴한</span>
            <span>#템플릿형</span>
            <span>
              기존에 구성되어 있는 템플릿을 이용하여 제작합니다.
              <br />
              디자인을 활용하여 고객님의 사양에 맞추어 수정이 진행되며 원하는 이미지의 홈페이지를 빠르고 저렴하게 제작할 수 있습니다.
            </span>
          </div>
          <SideListView listData={sideListData} />
        </article>
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

          .template,
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

          .template > .head,
          .customized > .head {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .template > .head > span:nth-child(1),
          .customized > .head > span:nth-child(1) {
            font-size: min(5vw, 20px);
          }

          .template > .head > span:nth-child(2),
          .customized > .head > span:nth-child(2) {
            font-size: min(6vw, 25px);
            font-weight: bold;
            margin-bottom: 10px;
          }

          .template > .head > span:nth-child(3),
          .customized > .head > span:nth-child(3) {
            font-size: min(4vw, 16px);
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

export default Homepage;
