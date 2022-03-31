import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="head">
        <div className="info">
          <Link href={'/menual/privacy-policy'}>
            <a target="_blank">개인정보 처리방침</a>
          </Link>
          <Link href={'/menual/terms-of-use'}>
            <a target="_blank">홈페이지 이용약관</a>
          </Link>
          <button onClick={() => alert('go E-mail collection refusal')}>이메일 수집거부</button>
        </div>
        <div className="others">
          <Link href="https://www.instagram.com/">
            <a target="_blank">
              <Image src={'/instagram.png'} width={15} height={15} objectFit="cover" alt="instagram" />
            </a>
          </Link>
          <Link href="https://www.facebook.com/">
            <a target="_blank">
              <Image src={'/facebook.png'} width={15} height={15} objectFit="cover" alt="facebook" />
            </a>
          </Link>
          <button onClick={() => alert('go download company profile')}>회사소개서 다운로드</button>
          <button onClick={() => alert('go customized proposal request')}>맞춤제안서 요청하기</button>
          <span>02-5555-5555</span>
        </div>
      </div>
      <div className="body">
        <span className="logo">DOUBLE K MEDIA</span>
        <span className="detail">
          {'회사명 : ㈜더블케이미디어 사업자등록번호 : 105-55-55555 대표 : 김민재 개인정보처리담당 : 홍길동 담당자 : 홍길동'}
          <br />
          {'주소 : 경기도 수원시 팔달구 인계동 1035-6, 스마트타워 17층 1704호 FAX : 0505-555-555~9, 0505-555-5555~9'}
          <br />
          {'EMAIL : doublek@naver.com 고객센터 : 02-5555-5555 (09:00 ~ 18:00 / 점심시간 12:00 ~ 13:00 / 토,일,공휴일 휴무)'}
          <br />
          {'Copyright ⓒ 2021 Double K Media. All rights reserved.'}
          <button onClick={() => (window.location.href = '/admin-host')}>{'[관리자 로그인]'}</button>
        </span>
      </div>

      <style jsx>
        {`
          footer {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            width: 100%;
            padding: 80px 70px;
            background-color: #333333;
          }

          footer * {
            color: white;
            white-space: nowrap;
          }

          .head {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 50px;
            width: 100%;
          }

          .head::after {
            content: '';
            position: absolute;
            width: 100%;
            bottom: -10px;
            border-bottom: 1px solid white;
          }

          .head button,
          .head a,
          .head span {
            font-size: 11px;
          }

          .info,
          .others {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
          }

          .body {
            display: flex;
            gap: 40px;
            width: 100%;
          }

          .logo {
            font-size: 24px;
            font-weight: bolder;
          }

          .detail,
          .detail > button {
            font-size: 12px;
          }

          .detail > button {
            margin-left: 20px;
          }

          @media screen and (max-width: 1050px) {
            span.logo {
              display: none;
            }
          }

          @media screen and (max-width: 850px) {
            footer {
              padding: 40px 35px;
            }

            div.head {
              flex-direction: column;
              gap: 5px;
            }
          }

          @media screen and (max-width: 700px) {
            span.detail {
              white-space: normal;
              word-break: keep-all;
              text-align: center;
            }
          }

          @media screen and (max-width: 450px) {
            footer {
              padding: 20px 15px;
            }

            div.head {
              flex-direction: column;
              gap: 20px;
            }

            div.info {
              flex-direction: column;
              gap: 5px;
            }

            div.others {
              flex-direction: column;
              gap: 5px;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
