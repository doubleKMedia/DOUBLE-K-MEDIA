import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

type inputValueType = {
  companyName: string;
  contactPerson: string;
  contact: string;
  email: string;
  marketingKPI: string;
  advertisingBudget: string;
  inquiriesAndRequirements: string;
};

const Marketing: NextPage = () => {
  const TITLE = 'Marketing';
  const DESCRIPTION = '더블케이미디어에게 마케팅 견적에 대해 문의합니다.';
  const MARKETING_KPI = ['광고 KPI를 선택해주세요.', '브랜딩', '회원가입', '매출확대', 'DB증대', '기타'];
  const ADVERTISING_BUDGET = ['광고 예산을 선택해주세요.', '50만원 이하', '50만원', '100만원', '200만원', '500만원', '1000만원 이상'];

  const [inputValue, setInputValue] = useState<inputValueType>({
    companyName: '',
    contactPerson: '',
    contact: '',
    email: '',
    marketingKPI: '',
    advertisingBudget: '',
    inquiriesAndRequirements: '',
  });
  const [lastCheck, setLastCheck] = useState<boolean>(false);
  const [marketingKPIIndex, setMarketingKPIIndex] = useState<number>(0);
  const [isMarketingKPIListOpen, setIsMarketingKPIListOpen] = useState<boolean>(false);
  const [advertisingBudgetIndex, setAdvertisingBudgetIndex] = useState<number>(0);
  const [isAdvertisingBudgetListOpen, setIsAdvertisingBudgetListOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const changeInput = (value: string, key: keyof inputValueType) => {
    const newValue = { ...inputValue, ...{ [key]: value } };
    setInputValue(newValue);
    sessionStorage.setItem('marketingInputValue', JSON.stringify(newValue));
  };

  const inputValueValidation = (successCallback: Function) => {
    if (isSending) alert('현재 요청 중 입니다.\n잠시만 기다려주세요.');
    const { companyName, contactPerson, contact, email } = inputValue;

    if (!companyName) alert('업체명을 작성해주세요.');
    else if (!contactPerson) alert('담당자명을 작성해주세요.');
    else if (!contact) alert('연락처를 작성해주세요.');
    else if (!email) alert('이메일을 작성해주세요.');
    else if (!lastCheck) alert('개인정보 수집 및 이용 동의를 체크해주세요.');
    else successCallback();
  };

  const sendDataToServer = async () => {
    setIsSending(true);
    const url = '/api-server/inquiry';
    const form = new FormData();

    const newInputValue = {
      inquiryType: 'marketing',
      ccustomerCompany: inputValue.companyName,
      customerName: inputValue.contactPerson,
      customerPhone: inputValue.contact,
      customerEmail: inputValue.email,
      customerContent: inputValue.inquiriesAndRequirements,
      marketingKpi: inputValue.marketingKPI,
    };

    form.append('data', JSON.stringify(newInputValue));

    try {
      const response = await fetch(url, { method: 'POST', body: form });

      if (response.ok) {
        alert('신청이 완료되었습니다.\n빠른 시일내에 답변 드리도록 하겠습니다.');
        sessionStorage.setItem('marketingInputValue', 'undefined');
        window.location.href = '/';
      } else alert(await response.text());
    } catch (error) {
      console.error(error);
      alert('오류가 발생하였습니다.\n잠시 후 다시 시도해 주세요.');
    }

    setIsSending(false);
  };

  useEffect(() => {
    const saveData = sessionStorage.getItem('marketingInputValue') ?? 'undefined';
    const MENT = '이전에 작성하던 데이터가 있습니다.\n불러오겠습니까?';
    if (saveData !== 'undefined') {
      if (confirm(MENT)) {
        const parsingData: inputValueType = JSON.parse(saveData);
        setInputValue(parsingData);
        setMarketingKPIIndex(MARKETING_KPI.findIndex((v) => v === parsingData.marketingKPI));
        setAdvertisingBudgetIndex(ADVERTISING_BUDGET.findIndex((v) => v === parsingData.advertisingBudget));
      } else sessionStorage.setItem('marketingInputValue', 'undefined');
    }
  }, []);

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
                  <input
                    onInput={(e) => changeInput(e.currentTarget.value, 'companyName')}
                    defaultValue={inputValue.companyName}
                    type="text"
                    minLength={1}
                    maxLength={50}
                  ></input>
                </div>
                <div className="input">
                  <span>
                    담당자 성함<strong>*</strong> (직책)
                  </span>
                  <input
                    onInput={(e) => changeInput(e.currentTarget.value, 'contactPerson')}
                    defaultValue={inputValue.contactPerson}
                    type="text"
                    minLength={1}
                    maxLength={20}
                  ></input>
                </div>
                <div className="input">
                  <span>
                    연락처 <strong>*</strong>
                  </span>
                  <input
                    onInput={(e) => changeInput(e.currentTarget.value, 'contact')}
                    defaultValue={inputValue.contact}
                    type="text"
                    minLength={1}
                    maxLength={20}
                  ></input>
                </div>
                <div className="input">
                  <span>
                    이메일 <strong>*</strong>
                  </span>
                  <input
                    onInput={(e) => changeInput(e.currentTarget.value, 'email')}
                    defaultValue={inputValue.email}
                    type="text"
                    minLength={1}
                    maxLength={100}
                  ></input>
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
                  <button
                    onClick={() => setIsMarketingKPIListOpen(!isMarketingKPIListOpen)}
                    className={`list up ${isMarketingKPIListOpen ? 'open' : ''}`}
                  >
                    {MARKETING_KPI[marketingKPIIndex]}
                    <ul>
                      {MARKETING_KPI.map((m, i) => (
                        <li
                          className={marketingKPIIndex === i ? 'select' : ''}
                          onClick={() => {
                            setMarketingKPIIndex(i);
                            changeInput(MARKETING_KPI[i], 'marketingKPI');
                          }}
                          key={i}
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </button>
                </div>
                <div className="input">
                  <span>광고예산</span>
                  <button
                    onClick={() => setIsAdvertisingBudgetListOpen(!isAdvertisingBudgetListOpen)}
                    className={`list down ${isAdvertisingBudgetListOpen ? 'open' : ''}`}
                  >
                    {ADVERTISING_BUDGET[advertisingBudgetIndex]}
                    <ul>
                      {ADVERTISING_BUDGET.map((a, i) => (
                        <li
                          className={advertisingBudgetIndex === i ? 'select' : ''}
                          onClick={() => {
                            setAdvertisingBudgetIndex(i);
                            changeInput(ADVERTISING_BUDGET[i], 'advertisingBudget');
                          }}
                          key={i}
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </button>
                </div>
                <div className="input">
                  <span>요청사항</span>
                  <textarea
                    onInput={(e) => changeInput(e.currentTarget.value, 'inquiriesAndRequirements')}
                    defaultValue={inputValue.inquiriesAndRequirements}
                    cols={30}
                    rows={20}
                    minLength={1}
                    maxLength={5000}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="agreement">
                <input onChange={(e) => setLastCheck(e.currentTarget.checked)} type="checkbox"></input>
                <span>개인정보 수집 및 이용에 동의합니다.</span>
                <Link href={'/menual/agreement'}>
                  <a target="_blank">[전문보기]</a>
                </Link>
              </div>
              <button onClick={() => inputValueValidation(sendDataToServer)} className="submit">
                맞춤제안서 요청하기
              </button>
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
          button.list,
          button.list > ul,
          textarea {
            width: 300px;
            border: 1px solid #cccccc;
            border-radius: 20px;
          }

          input[type='text'],
          button.list {
            height: 40px;
          }

          input[type='text'] {
            text-align: center;
          }

          textarea {
            padding: 10px;
            resize: vertical;
          }

          button.list {
            position: relative;
            display: flex;
            justify-content: left;
            align-items: center;
            text-align: left;
            padding: 0 20px;
          }

          button.list.up {
            z-index: 2;
          }

          button.list.down {
            z-index: 1;
          }

          button.list::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            border-top: 2px solid #6cc26c;
            border-right: 2px solid #6cc26c;
            right: 20px;
            box-sizing: border-box;
            z-index: 1;
            transform: rotate(-45deg);
            transition: transform 0.3s ease-in-out;
          }

          button.list.open::after {
            transform: rotate(135deg);
          }

          button.list > ul {
            position: absolute;
            visibility: hidden;
            display: flex;
            flex-direction: column;
            padding: 0 20px;
            background-color: white;
            left: -1px;
            top: -1px;
            z-index: 1;
          }

          button.list.open > ul {
            visibility: visible;
          }

          button.list > ul > li {
            width: 100%;
            padding: 10px 0;
            list-style: none;
            border-bottom: 1px solid #cccccc;
            transition: color 0.1s;
          }

          button.list > ul > li:hover,
          button.list > ul > li.select {
            color: #6cc26c;
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

          @media screen and (max-width: 1150px) {
            .input-document {
              padding: 50px;
            }
          }

          @media screen and (max-width: 1100px) {
            .input-document {
              padding: 40px;
            }

            .box {
              padding: 80px 40px;
            }
          }

          @media screen and (max-width: 950px) {
            div.row {
              flex-direction: column;
            }

            .box {
              padding: 80px;
            }
          }

          @media screen and (max-width: 750px) {
            div.input {
              flex-direction: column;
            }

            div.input > span {
              width: auto;
            }

            .agreement {
              font-size: 12px;
            }
          }

          @media screen and (max-width: 550px) {
            .box {
              padding: 40px;
            }
          }

          @media screen and (max-width: 450px) {
            .input-document {
              padding: 40px 0;
            }

            .box {
              gap: 30px;
              border-radius: 30px;
            }

            div.row {
              gap: 30px;
            }

            span.ment {
              font-size: 15px;
            }

            input[type='text'],
            textarea,
            button.list,
            button.list > ul {
              width: 200px;
              font-size: 12px;
            }

            .agreement {
              font-size: 10px;
            }

            .submit {
              width: 180px;
              height: 40px;
              font-size: 15px;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default Marketing;
