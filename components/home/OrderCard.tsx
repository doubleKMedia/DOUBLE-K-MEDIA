import Image from 'next/image';
import { ReactNode } from 'react';

type OrderCardPropsType = { children: ReactNode; src: string; direction: 'left' | 'right'; number: number; title: string; isLast: boolean };

const OrderCard = ({ children, src, direction, number, title, isLast }: OrderCardPropsType) => {
  return (
    <article className={`order-card ${direction} ${isLast ? 'last' : 'not-last'}`}>
      <div className="card">
        <Image src={src} layout="fill" objectFit="cover" alt={title} />
      </div>
      <span className="number">{`${number.toString().padStart(2, '0')}.`}</span>
      <div className="explanation">
        <span className="title">{title}</span>
        <span className="contents">{children}</span>
      </div>
      <style jsx>
        {`
          .order-card {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-start;
          }

          .order-card.right {
            flex-direction: row-reverse;
          }

          .card {
            position: relative;
            width: 400px;
            height: 250px;
            border-radius: 20px;
            margin: 0 60px 40px 0;
            overflow: hidden;
          }

          .order-card.right > .card {
            margin: 0 0 40px 60px;
          }

          .number {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-weight: bolder;
            transform: translateY(30px);
          }

          .order-card.not-last > .number::after {
            content: '';
            position: absolute;
            height: 180px;
            top: 50px;
            border-left: 1px solid #545454;
          }

          .explanation {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 50px;
            width: 460px;
            padding: 0 20px;
            transform: translateY(35px);
          }

          .order-card.right > .explanation {
            align-items: flex-end;
          }

          .title {
            font-size: 24px;
            font-weight: bold;
          }

          .contents {
            font-size: 15px;
            line-height: 25px;
            word-spacing: 3px;
          }

          .order-card.right .contents {
            text-align: right;
          }

          @media screen and (max-width: 1050px) {
            .order-card,
            .order-card.right {
              flex-direction: column;
              align-items: center;
            }

            .card,
            .order-card.right > .card {
              margin: 0;
            }

            .number {
              position: absolute;
              transform: translate(-160px, 10px);
              padding-bottom: 10px;
            }

            .order-card.right .number {
              transform: translate(160px, 10px);
            }

            .order-card.not-last > .number::after {
              display: none;
            }

            .explanation {
              width: 400px;
              height: 300px;
              gap: 10px;
              padding-top: 50px;
              transform: none;
            }

            @media screen and (max-width: 500px) {
              .number {
                font-size: 5vw;
                padding: 0;
                padding-left: 20px;
                transform: translate(-34vw, 1vw);
              }

              .order-card.right .number {
                padding: 0;
                padding-right: 20px;
                transform: translate(34vw, 1vw);
              }

              .card {
                width: 80vw;
                height: 50vw;
              }

              .explanation {
                width: 80vw;
                height: 60vw;
                padding-top: 10vw;
              }

              span.title {
                font-size: 5vw;
              }

              span.contents {
                font-size: 3vw;
                line-height: 5vw;
              }
            }
          }
        `}
      </style>
    </article>
  );
};

export default OrderCard;
