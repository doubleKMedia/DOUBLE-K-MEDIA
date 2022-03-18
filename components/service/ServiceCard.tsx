import Image from 'next/image';
import React, { ReactNode } from 'react';

export type cardInfoType = { title: string; titleEn: string; imgSrc: string; description: string[] };

type ServiceCardPropsType = {
  children: ReactNode;
  cardInfo: cardInfoType;
};

const ServiceCard = (props: ServiceCardPropsType) => {
  const { children, cardInfo } = props;
  const { title, titleEn, imgSrc, description } = cardInfo;

  return (
    <div className="service-card">
      <div className="image">
        <Image src={imgSrc} layout="fill" objectFit="cover" objectPosition="50% 50%" alt={titleEn} priority />
      </div>
      <div className="head">
        <span className="titleEn">{titleEn}</span>
        <span className="title">{title}</span>
      </div>
      <div className="description">
        {description.map((str, i) => (
          <React.Fragment key={i}>
            {str}
            <br />
          </React.Fragment>
        ))}
      </div>
      <div className="contents">{children}</div>

      <style jsx>
        {`
          .service-card {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 300px;
            height: 400px;
            border: 0.5px solid #6e6e6e;
            border-radius: 20px;
            overflow: hidden;
          }

          .image,
          .head,
          .description,
          .contents {
            position: relative;
            width: 100%;
          }

          .image {
            height: 150px;
          }

          .head,
          .description {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 80px;
            gap: 5px;
          }

          .head > .titleEn {
            color: rgba(108, 194, 108, 0.5);
            white-space: nowrap;
          }

          .head > .title {
            font-size: 25px;
            white-space: nowrap;
          }

          .description {
            background-color: rgba(108, 194, 108, 0.2);
            font-size: 13px;
            white-space: nowrap;
          }

          .contents {
            padding: 10px 20px;
            height: 100px;
            font-size: 12px;
          }

          .contents * {
            word-break: keep-all;
          }

          @media screen and (max-width: 350px) {
            .service-card {
              margin: -20px 0;
              transform: scale(0.8);
            }
          }

          @media screen and (max-width: 300px) {
            .service-card {
              margin: -60px 0;
              transform: scale(0.6);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ServiceCard;
