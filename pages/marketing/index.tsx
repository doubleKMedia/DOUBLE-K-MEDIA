import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';

const Marketing: NextPage = () => {
  const TITLE = 'Marketing';
  const DESCRIPTION = '더블케이미디어에게 마케팅 견적에 대해 문의합니다.';

  return (
    <Layout title={TITLE} description={DESCRIPTION} mode="dark">
      <div className="marketing">
        <div className="head">
          <span>마케팅 견적문의</span>
          <span>
            클라이언트의 온라인 마케팅 방향에 따라 맞춤제안서를 발송해드립니다.
            <br />
            연락처를 남겨주시면 업무일 기준 24시간내에 담당자가 연락드립니다.
          </span>
        </div>
        <div className="input-document">
          <div className="box">
            <div className="row">
              <span className="ment">
                <strong>기본 정보</strong>를<br />
                입력해주세요.
              </span>
              <div className="input-box">
                <span className="alert">
                  <strong>*</strong> 표시는 필수입력 항목입니다.
                </span>
                <div className="input">
                  <span>
                    업체명 <strong>*</strong>
                  </span>
                  <input type="text" minLength={1} maxLength={50}></input>
                </div>
                <div className="input">
                  <span>담당자 성함/직책</span>
                  <input type="text" minLength={1} maxLength={20}></input>
                </div>
                <div className="input">
                  <span>
                    연락처 <strong>*</strong>
                  </span>
                  <input type="text" minLength={1} maxLength={20}></input>
                </div>
                <div className="input">
                  <span>
                    이메일 <strong>*</strong>
                  </span>
                  <input type="text" minLength={1} maxLength={100}></input>
                </div>
              </div>
            </div>
            <div className="row">
              <span className="ment">
                <strong>추가 정보</strong>를<br />
                입력해주세요.
              </span>
              <div className="input-box">
                <div className="input">
                  <span>마케팅 KPI</span>
                  <div className="select">
                    <button>광고 KPI를 선택해주세요.</button>
                  </div>
                </div>
                <div className="input">
                  <span>광고예산</span>
                  <div className="select">
                    <button>광고 예산을 선택해주세요.</button>
                  </div>
                </div>
                <div className="input">
                  <span>요청사항</span>
                  <textarea cols={30} rows={20} minLength={1} maxLength={5000}></textarea>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="agreement">
                <input type="checkbox"></input>
                <span>개인정보 수집 및 이용에 동의합니다.</span>
                <Link href={'/menual/agreement'}>
                  <a target="_blank">[전문보기]</a>
                </Link>
              </div>
              <button className="submit">맞춤제안서 요청하기</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .marketing {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 200px 0 0 0;
            background-color: #f9f9f9;
          }

          .head {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-bottom: 50px;
          }

          .head > span:nth-child(1) {
            font-size: 30px;
            color: #6cc26c;
          }

          .head > span:nth-child(2) {
            font-size: 14px;
            color: #888888;
            text-align: center;
          }

          .input-document {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ebf4eb;
            width: 100%;
            padding: 100px;
          }

          .box {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 100px;
            width: 100%;
            background-color: white;
            border-radius: 80px;
            box-shadow: 1px 1px 20px rgba(112, 112, 112, 0.05), 1px -1px 20px rgba(112, 112, 112, 0.05), -1px 1px 20px rgba(112, 112, 112, 0.05),
              -1px -1px 20px rgba(112, 112, 112, 0.05);
            padding: 80px;
            color: #666666;
          }

          div.row {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 80px;
          }

          div.input-box {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            width: 100%;
            border-top: 3px solid #6cc26c;
            box-sizing: border-box;
          }

          div.input {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            width: 100%;
            border-bottom: 1px solid #6cc26c;
            padding: 20px 0;
          }

          div.input > span {
            text-align: left;
            font-size: 18px;
            width: 200px;
          }

          span > strong {
            color: #6cc26c;
            font-weight: normal;
          }

          span.ment {
            text-align: left;
            font-size: 30px;
          }

          span.alert {
            position: absolute;
            right: 0;
            top: -30px;
            font-size: 12px;
          }

          span.alert > strong {
            font-size: 20px;
            line-height: 0;
          }

          input[type='text'],
          div.select,
          textarea {
            width: 300px;
            border: 1px solid #cccccc;
            border-radius: 20px;
          }

          input[type='text'],
          div.select {
            height: 40px;
          }

          input[type='text'] {
            text-align: center;
          }

          textarea {
            padding: 10px;
            resize: vertical;
          }

          .agreement {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .submit {
            width: 300px;
            height: 50px;
            font-size: 20px;
            font-weight: bold;
            color: white;
            margin-top: 30px;
            background-color: #6cc26c;
            border-radius: 25px;
          }
        `}
      </style>
    </Layout>
  );
};

export default Marketing;
