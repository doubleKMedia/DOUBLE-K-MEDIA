import Image from 'next/image';
import Link from 'next/link';

type listDataType = {
  imgsrc: string;
  title: string;
  description: string;
  link: string;
}[];

const LineListView = ({ listData }: { listData: listDataType }) => {
  return (
    <section className="list">
      {listData.map((data, i) => (
        <div key={i}>
          <div className="img">
            <Image src={data.imgsrc} layout="fill" objectFit="cover" alt={data.title} />
          </div>
          <span className="title">{data.title}</span>
          <span className="description">{data.description}</span>
          <Link href={data.link}>
            <a className="link" target="_blank" />
          </Link>
        </div>
      ))}

      <style jsx>
        {`
          .list {
            position: relative;
            display: grid;
            justify-items: center;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            padding: 50px;
            width: 100%;
          }

          .list > div {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 300px;
          }

          .img {
            position: relative;
            width: 300px;
            height: 200px;
          }

          .title {
            font-size: 20px;
            font-weight: bold;
          }

          .description {
            font-size: 15px;
            color: #6a6a6a;
          }

          .link {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          @media screen and (max-width: 400px) {
            section.list {
              padding-left: 0;
              padding-right: 0;
            }
          }

          @media screen and (max-width: 330px) {
            section.list {
              gap: 50px;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            }

            section.list > div {
              width: 250px;
            }

            div.img {
              width: 250px;
              height: 133px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default LineListView;
