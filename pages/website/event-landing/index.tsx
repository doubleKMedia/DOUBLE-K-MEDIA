import { NextPage } from 'next';
import ScrollListView from '../../../components/website/ScrollListView';
import WebsiteLayout from '../../../components/website/WebsiteLayout';
import scrollListData from './scrollListData.json';

const EventLanding: NextPage = () => {
  return (
    <WebsiteLayout>
      <div className="homepage">
        <article className="customized">
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
            background-color: white;
          }
        `}
      </style>
    </WebsiteLayout>
  );
};

export default EventLanding;
