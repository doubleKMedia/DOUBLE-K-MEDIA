import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import WebsiteLayout from '../../../components/website/WebsiteLayout';

const ProjectInquiry: NextPage = () => {
  return (
    <WebsiteLayout>
      <div className="project-inquiry">
        <section>
          <article className="info">
            <span className="question">
              <strong>1.</strong> 기본정보를 입력해주세요.
            </span>
            <span className="alert">필수항목입니다.</span>
            <div className="line">
              <div>
                <span className="title">
                  업체명<strong>*</strong>
                </span>
                <input className="large" type="text" minLength={1} maxLength={50}></input>
              </div>
              <div>
                <span className="title">
                  담당자명<strong>*</strong>
                </span>
                <input className="small" type="text" minLength={1} maxLength={20}></input>
              </div>
              <div>
                <span className="title">
                  직급<strong>*</strong>
                </span>
                <input className="small" type="text" minLength={1} maxLength={20}></input>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title">
                  연락처<strong>*</strong>
                </span>
                <input className="large" type="text" minLength={1} maxLength={11} placeholder='"-" 를 빼고 입력해주세요.'></input>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title">
                  이메일<strong>*</strong>
                </span>
                <input className="large" type="text" minLength={1} maxLength={50}></input>@
                <input className="large" type="text" minLength={1} maxLength={50}></input>
                <button>직접입력</button>
              </div>
            </div>
          </article>
          <article className="service">
            <span className="question">
              <strong>2.</strong> 어떤 서비스가 필요하신 가요?
            </span>
            <div className="line">
              <div>
                <span className="title align-center">제작분야</span>
                <div>
                  <input type="checkbox"></input>
                  <span className="check-box">홈페이지</span>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <span className="check-box">쇼핑몰</span>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <span className="check-box">디자인</span>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <span className="check-box">이벤트 랜딩</span>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <span className="check-box">기타</span>
                </div>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">제작 페이지 수</span>
                <input className="large" type="text" minLength={1} maxLength={50}></input>
              </div>
              <div>
                <span className="title align-center">제작 예산</span>
                <input className="large" type="text" minLength={1} maxLength={50}></input>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">보유 홈페이지 주소</span>
                <input className="large" type="text" minLength={1} maxLength={100}></input>
              </div>
              <div className="align-flex-start">
                <span className="title align-center padding-top">참고사이트 주소</span>
                <div className="col">
                  <input className="large" type="text" minLength={1} maxLength={100}></input>
                  <input className="large" type="text" minLength={1} maxLength={100}></input>
                  <input className="large" type="text" minLength={1} maxLength={100}></input>
                </div>
              </div>
            </div>
          </article>
          <article className="detail">
            <span className="question">
              <strong>3.</strong> 상세 내용을 기재해주세요.
            </span>
            <div className="line">
              <div>
                <span className="title align-center">
                  문의 및 요구사항<strong>*</strong>
                </span>
                <textarea cols={100} rows={10} minLength={1} maxLength={5000}></textarea>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">
                  자동등록방지<strong>*</strong>
                </span>
                <div className="col left">
                  <div className="align-left gap">
                    <Image src="/null.png" width={100} height={40} objectFit="cover" alt="자동등록방지 이미지" />
                    <input className="small" type="text" minLength={1} maxLength={10}></input>
                  </div>
                  <span>(글자가 잘 안보이는 경우, 클릭하시면 새로운 글자가 나옵니다.)</span>
                </div>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">파일첨부</span>
                <div>
                  <span className="input-box">첨부된 파일 없음</span>
                  <label htmlFor="file">파일 불러오기</label>
                  <input id="file" type="file"></input>
                </div>
              </div>
            </div>
          </article>
        </section>
        <div className="agreement-check">
          <span className="agreement">
            저희 ㈜더블케이미디어에 문의사항 또는 상담이 필요하신 분은 온라인 상담을 남겨주세요.
            <br />
            전화로 연락주시거나 아래의 상담 양식을 작성하여 남겨주시면 빠른 시일에 답변 드리겠습니다.
            <br />
            궁금하신 사항은 031-233-9534/9533 또는 double_k_media@naver.com 으로 연락주시기 바랍니다.
            <br />
            <br />
            ㈜더블케이미디어는 고객님들의 의견 접수와 관련하여 성실한 답변을 드리기 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
            <br />
            <br />
            · 수집 및 이용 목적 : 고객 문의에 대한 답변/안내
            <br />
            · 수집 및 이용 항목 : 업체명, 이름, 연락처, 이메일
            <br />
            · 보유 및 이용 기간 : 수집 및 이용 목적 달성 시 까지
            <br />
            <br />
            ※ 문의에 대한 답변을 위해서 필요한 최소한의 개인정보이므로 동의를 해 주셔야 서비스를 이용하실 수 있습니다.
            <br />
          </span>
          <div>
            <input className="checkbox" type="checkbox"></input>
            <span>위 사항에 동의하십니까?</span>
            <Link href={'/website/project-inquiry/agreement'}>
              <a target="_blank">전문보기</a>
            </Link>
          </div>
        </div>
        <button className="submit">상담 신청하기</button>
      </div>

      <style jsx>
        {`
          .project-inquiry {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 50px;
            width: 80%;
            padding: 100px 0;
          }

          section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            gap: 100px;
          }

          article {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            width: 100%;
          }

          .question {
            font-size: 24px;
            border-bottom: 1.5px solid #2a2a2a;
            width: 100%;
            padding-bottom: 20px;
          }

          .alert {
            position: absolute;
            right: 0;
            top: 30px;
            font-size: 14px;
          }

          .alert::before {
            content: '* ';
            position: absolute;
            left: -15px;
            top: 13px;
            font-size: 25px;
            line-height: 0;
            color: red;
          }

          .line {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 20px;
            width: 100%;
            height: 100%;
            padding: 20px;
            border-bottom: 1px solid #d6d6d6;
          }

          .line div {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .line > div {
            gap: 20px;
          }

          .line div.align-flex-start {
            align-items: flex-start;
          }

          .line div.col {
            flex-direction: column;
            padding: 0;
            gap: 5px;
          }

          .line div.align-left {
            justify-content: flex-start;
            width: 100%;
          }

          .line div.gap {
            gap: 10px;
          }

          .line span {
            font-size: 12px;
          }

          .line span.padding-top {
            padding-top: 10px;
          }

          .line span.title {
            position: relative;
            text-align: right;
            width: 120px;
            padding-right: 20px;
            white-space: nowrap;
          }

          .line span.align-center {
            text-align: center;
            padding-right: 0;
          }

          .line span.check-box {
            margin: 0 10px;
          }

          .line span.input-box {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          span.title > strong {
            padding-left: 5px;
            color: red;
            font-size: 20px;
            line-height: 0;
          }

          input,
          textarea,
          span.input-box {
            border: 1px solid #e3e3e3;
            background-color: #ececec;
            border-radius: 3px;
          }

          textarea {
            padding: 5px;
          }

          input {
            text-align: center;
          }

          input.large,
          span.input-box {
            width: 200px;
            height: 40px;
          }

          input.small {
            width: 120px;
            height: 40px;
          }

          input[type='file'] {
            display: none;
          }

          label {
            font-size: 12px;
            text-decoration: underline;
            margin-left: 20px;
            cursor: pointer;
          }

          .agreement {
            width: 100%;
            font-size: 14px;
            border: 1px solid #d8d8d8;
            border-radius: 20px;
            background-color: #ececec;
            padding: 30px;
          }

          .agreement-check {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            gap: 10px;
          }

          .agreement-check > div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .agreement-check > div > span {
            font-size: 14px;
          }

          .agreement-check > div > a {
            font-size: 12px;
            text-decoration: underline;
          }

          button.submit {
            background-color: #4a4a4a;
            font-size: 18px;
            color: white;
            padding: 20px 100px;
            border-radius: 50px;
          }
        `}
      </style>
    </WebsiteLayout>
  );
};

export default ProjectInquiry;
