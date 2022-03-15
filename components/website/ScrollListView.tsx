import Image from 'next/image';
import Link from 'next/link';

type listDataType = {
  imgsrc: string;
  title: string;
  price: number;
  productionPage: string;
  productionPeriod: string;
  description: string;
}[];

const ScrollListView = ({ listData, link }: { listData: listDataType; link: string }) => {
  const location = (i: number, last: number) => {
    return `${i === 0 ? 'head' : i % 2 === 0 ? 'left' : 'right'} ${i === last ? 'tail' : ''}`;
  };

  return (
    <section className="list">
      {listData.map((data, i) => (
        <div className={location(i, listData.length - 1)} key={i}>
          <div className="img">
            <Image src={data.imgsrc} layout="fill" objectFit="cover" alt={data.title} />
          </div>
          <div className="info">
            <span className="title">{data.title}</span>
            <span className="price">
              최저 <strong>{data.price}만원</strong> 부터~
            </span>
            <div className="production">
              <div className="page">
                <div>
                  <span>제작페이지</span>
                  <span>{data.productionPage}</span>
                </div>
              </div>
              <div className="period">
                <div>
                  <span>제작기간</span>
                  <span>{data.productionPeriod}</span>
                </div>
              </div>
            </div>
            <span className="description">{data.description}</span>
          </div>
        </div>
      ))}
      <Link href={link}>
        <a className="link">프로젝트 문의</a>
      </Link>

      <style jsx>
        {`
          .list {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .list > div {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 50px;
            width: 100%;
            padding: 150px 0 250px 0;
            margin: -100px 0;
          }

          .list > div.tail {
            padding-bottom: 280px;
          }

          .list > div.left {
            background-color: white;
            clip-path: polygon(0 0, 100% 15%, 100% 100%, 0% 100%);
          }

          .list > div.right {
            background-color: #f9f9f9;
            flex-direction: row-reverse;
            clip-path: polygon(0 15%, 100% 0%, 100% 100%, 0% 100%);
          }

          .img {
            position: relative;
            width: 400px;
            min-width: 400px;
            height: 300px;
          }

          .info {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 400px;
          }

          .title {
            background-color: #6cc26c;
            font-size: 18px;
            color: white;
            text-align: center;
            width: 200px;
            padding: 5px 0;
            border-radius: 20px;
          }

          .price {
            font-size: 18px;
          }

          .price > strong {
            font-size: 22px;
            color: #6cc26c;
          }

          .production {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            padding: 20px 0 15px 0;
            border-bottom: 1px solid #e1e1e1;
          }

          .page,
          .period,
          .description {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10px;
            width: 100%;
          }

          .description {
            align-items: center;
            padding-top: 10px;
          }

          .page > div,
          .period > div {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }

          .page > div > span:nth-child(2),
          .period > div > span:nth-child(2) {
            font-size: 14px;
          }

          .page > div > span:nth-child(2),
          .period > div > span:nth-child(2),
          .description {
            font-size: 12px;
            color: #555555;
          }

          .page::before,
          .period::before,
          .description::before {
            content: '';
            position: relative;
            min-width: 45px;
            min-height: 45px;
            border-radius: 50%;
            border: 3.5px solid #e1e1e1;
          }

          .link {
            position: absolute;
            bottom: 50px;
            width: 80%;
            text-align: center;
            font-size: 14px;
            color: white;
            background-color: #6cc26c;
            padding: 10px 0;
          }
        `}
      </style>
    </section>
  );
};

export default ScrollListView;
