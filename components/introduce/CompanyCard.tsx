import React from 'react';

const CompanyCard = ({ title, point, sub }: { title: string; point: string[]; sub: string }) => {
  return (
    <div className="card">
      <span className="title">{title}</span>
      <span className="point">
        {point.map((str, i) => (
          <React.Fragment key={i}>
            {str}
            <br />
          </React.Fragment>
        ))}
      </span>
      <span className="sub">{sub}</span>
      <style jsx>
        {`
          .card {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: 400px;
            height: 150px;
            background-color: white;
            border: 1px solid #6cc26c;
            border-radius: 20px;
          }

          .title {
            font-size: 15px;
          }

          .point {
            font-size: 25px;
            font-weight: bolder;
            color: #6cc26c;
            text-align: center;
          }

          .sub {
            font-size: 12px;
            color: #6cc26c;
          }
        `}
      </style>
    </div>
  );
};

export default CompanyCard;
