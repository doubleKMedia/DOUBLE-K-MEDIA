import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type listDataType = {
  imgsrc: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
}[];

const SideListView = ({ listData }: { listData: listDataType }) => {
  const maxViewNumber = listData.length - 1;
  const [viewNumber, setViewNumber] = useState<number>(0);

  const sideButtonClick = (isLeft: boolean) => {
    if (isLeft) {
      if (viewNumber === 0) setViewNumber(maxViewNumber);
      else setViewNumber(viewNumber - 1);
    } else {
      if (viewNumber === maxViewNumber) setViewNumber(0);
      else setViewNumber(viewNumber + 1);
    }
  };

  return (
    <div className="view">
      <button onClick={() => sideButtonClick(true)}>
        <Image src="/website/arrow.svg" width={100} height={200} alt="left arrow" />
      </button>
      <button onClick={() => sideButtonClick(false)}>
        <Image src="/website/arrow.svg" width={100} height={200} alt="right arrow" />
      </button>
      <section style={{ '--viewNum': viewNumber } as React.CSSProperties}>
        {listData.map((data, i) => (
          <div className="page" key={i}>
            <div className="img">
              <Image src={data.imgsrc} layout="fill" objectFit="cover" alt={data.title} />
            </div>
            <div className="info">
              <span className="title">{data.title}</span>
              <span className="subtitle">{data.subtitle}</span>
              <span className="description">{data.description}</span>
              <Link href={data.link}>
                <a className="link" target="_blank">
                  샘플 더 보기
                </a>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <style jsx>
        {`
          .view {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 500px;
            box-sizing: border-box;
            padding: 70px 0;
            overflow: hidden;
          }

          .view > button {
            position: absolute;
            width: 75px;
            height: 150px;
            z-index: 1;
          }

          .view > button:nth-child(1) {
            left: 35px;
          }

          .view > button:nth-child(2) {
            right: 35px;
            transform: rotateZ(180deg);
          }

          section {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }

          .page {
            position: relative;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 3vw;
            width: 100vw;
            padding: max(150px, 10vw);
            transform: translateX(calc(var(--viewNum) * -100%));
            transition: transform 1s ease-in-out;
          }

          .page > .img {
            position: relative;
            width: 300px;
            min-width: 300px;
            height: 300px;
          }

          .page > .info {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }

          .title {
            font-size: 24px;
            font-weight: bold;
            color: #6cc26c;
          }

          .subtitle {
            font-size: 14px;
            color: #6a6a6a;
          }

          .description {
            font-size: 13px;
            color: #6a6a6a;
            word-break: keep-all;
            border-top: 2px solid #6cc26c;
            margin-top: 20px;
            padding-top: 10px;
          }

          .link {
            background-color: #6cc26c;
            color: white;
            font-size: 13px;
            margin-top: 30px;
            padding: 5px 20px;
            border-radius: 20px;
          }

          @media screen and (max-width: 900px) {
            .view {
              transform: scale(0.8);
              width: 120%;
              height: 400px;
            }

            .page {
              width: 120vw;
            }
          }

          @media screen and (max-width: 700px) {
            .view {
              transform: scale(0.6);
              width: 160%;
              height: 300px;
            }

            .page {
              width: 160vw;
            }
          }
          @media screen and (max-width: 550px) {
            .view {
              transform: scale(1);
              width: 100%;
              height: auto;
            }

            .view > button {
              display: none;
            }

            section {
              position: relative;
              flex-direction: column;
              height: auto;
              gap: 50px;
            }

            .page {
              flex-direction: column;
              width: 100vw;
              transform: none;
              padding: 0 20px;
            }

            .page > .img {
              width: 250px;
              min-width: 250px;
              height: 250px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SideListView;
