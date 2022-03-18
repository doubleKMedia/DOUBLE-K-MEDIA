import Image from 'next/image';
import Link from 'next/link';

type infoType = {
  imgsrc: string;
  link: string;
  category: string;
  title: string;
  explanation: string[];
};

const PortfolioCard = ({ info }: { info: infoType }) => {
  const { imgsrc, link, category, title, explanation } = info;

  return (
    <li>
      <div className="page-img">
        <Image src={imgsrc} layout="fill" objectFit="cover" alt={title} priority />
      </div>
      <div className="contents">
        <span className="category">{category}</span>
        <span className="title">{title}</span>
        <div className="explanation">
          {explanation.map((e, i) => (
            <span key={i}>· {e}</span>
          ))}
        </div>
      </div>
      <Link href={link}>
        <a className="link" target="_blank" />
      </Link>

      <style jsx>
        {`
          li {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 330px;
            border-radius: 20px;
            border: 1px solid gray;
            overflow: hidden;
          }

          .page-img,
          .contents {
            position: relative;
            width: 100%;
            height: 200px;
          }

          .contents {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 3px;
            padding: 20px;
            background-color: white;
          }

          .category {
            font-size: 14px;
            color: #6cc26c;
          }

          .title {
            font-size: 24px;
            margin-bottom: 5px;
          }

          .explanation {
            font-size: 12px;
            color: #7a7a7a;
            word-break: keep-all;
            gap: 3px;
          }

          .link {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          @media screen and (max-width: 350px) {
            li {
              transform: scale(0.8);
              margin: -50px;
            }
          }

          @media screen and (max-width: 300px) {
            li {
              transform: scale(0.6);
              margin: -100px;
            }
          }
        `}
      </style>
    </li>
  );
};

export default PortfolioCard;
