import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import WebsiteLayout from '../../../components/website/WebsiteLayout';
import { fileExtensionChange, onlyNumberInput } from '../../../utils/validation';

export type inputValueType = {
  companyName: string;
  contactPerson: string;
  rank: string;
  contact: string;
  email: [string, string];
  manufacturingField: string[];
  numberOfPagesProduced: string;
  productionBudget: string;
  retentionWebsiteAddress: string;
  referenceSiteAddress: [string, string, string];
  inquiriesAndRequirements: string;
  preventionOfAutomaticRegistration: string;
  captchaKey: string;
};

const ProjectInquiry: NextPage<{ captcha: { cpk: string; imgSrc: string } }> = ({ captcha }) => {
  const EMAIL_LIST = [
    { name: '직접 입력', host: '직접 입력' },
    { name: '네이버', host: 'naver.com' },
    { name: '야후', host: 'yahoo.com' },
    { name: '구글', host: 'google.com' },
    { name: '카카오', host: 'kakao.com' },
  ];
  const ACCEPT_EXTENSIONS = ['gif', 'jpg', 'png', 'pdf'];
  const MANUFACTURING_FIELD = ['홈페이지', '쇼핑몰', '디자인', '이벤트 랜딩', '기타'];
  const CAPACITY_LIMIT = 41943040; //바이트 단위 (40MB);

  const [inputValue, setInputValue] = useState<inputValueType>({
    companyName: '',
    contactPerson: '',
    rank: '',
    contact: '',
    email: ['', ''],
    manufacturingField: [],
    numberOfPagesProduced: '',
    productionBudget: '',
    retentionWebsiteAddress: '',
    referenceSiteAddress: ['', '', ''],
    inquiriesAndRequirements: '',
    preventionOfAutomaticRegistration: '',
    captchaKey: captcha.cpk,
  });
  const [file, setFile] = useState<File>();
  const [lastCheck, setLastCheck] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [selectEmailIndex, setSelectEmailIndex] = useState<number>(0);
  const [isOpenSelectEmailList, setIsOpenSelectEmailList] = useState<boolean>(false);

  const saveInputData = (saveData: inputValueType) => sessionStorage.setItem('inputValue', JSON.stringify(saveData));

  const inputValueValidation = (successCallback: Function) => {
    if (isSending) alert('현재 요청 중 입니다.\n잠시만 기다려주세요.');
    const { companyName, contactPerson, contact, email, inquiriesAndRequirements, preventionOfAutomaticRegistration } = inputValue;

    if (!companyName) alert('업체명을 작성해주세요.');
    else if (!contactPerson) alert('담당자명을 작성해주세요.');
    else if (!contact) alert('연락처를 작성해주세요.');
    else if (!email[0] || !email[1]) alert('이메일을 작성해주세요.');
    else if (!inquiriesAndRequirements) alert('문의 및 요구사항을 작성해주세요.');
    else if (!preventionOfAutomaticRegistration) alert('자동등록방지를 작성해주세요.');
    else if (!lastCheck) alert('개인정보 수집 및 이용 동의를 체크해주세요.');
    else successCallback();
  };

  const changeChaptcha = async () => {
    const { cpk } = await (await fetch('/api-server/captchaKey', { method: 'GET' })).json();
    setInputValue({ ...inputValue, captchaKey: cpk });
  };

  const sendDataToServer = async () => {
    setIsSending(true);
    const url = '/api-server/inquiry';
    const form = new FormData();

    const newInputValue = {
      inquiryType: 'homepage',
      customerCompany: inputValue.companyName,
      customerName: inputValue.contactPerson,
      customerRank: inputValue.rank,
      customerPhone: inputValue.contact,
      customerEmail: inputValue.email.join('@'),
      serviceType: inputValue.manufacturingField.join(','),
      servicePage: inputValue.numberOfPagesProduced,
      serviceBudget: inputValue.productionBudget,
      customerHpage: inputValue.retentionWebsiteAddress,
      customerRpage1: inputValue.referenceSiteAddress[0],
      customerRpage2: inputValue.referenceSiteAddress[1],
      customerRpage3: inputValue.referenceSiteAddress[2],
      customerContent: inputValue.inquiriesAndRequirements,
      captcha: {
        cpk: inputValue.captchaKey,
        value: inputValue.preventionOfAutomaticRegistration,
      },
    };

    if (file) form.append('file', file);
    form.append('data', JSON.stringify(newInputValue));

    try {
      const response = await fetch(url, { method: 'POST', body: form });

      if (response.ok) {
        alert('신청이 완료되었습니다.\n빠른 시일내에 답변 드리도록 하겠습니다.');
        sessionStorage.setItem('inputValue', 'undefined');
        window.location.href = '/';
      } else alert(await response.text());
    } catch (error) {
      console.error(error);
      alert('오류가 발생하였습니다.\n잠시 후 다시 시도해 주세요.');
    }

    setIsSending(false);
  };

  const inputCommonFunc = (e: any, objectKey: keyof inputValueType, index = 0) => {
    let value;
    if (['email', 'manufacturingField', 'referenceSiteAddress'].includes(objectKey)) {
      const object = inputValue[objectKey] as string[] | [string, string] | [string, string, string];
      object[index] = e.currentTarget.value;
      value = { [objectKey]: object };
    } else value = { [objectKey]: e.currentTarget.value };
    setInputValue({ ...inputValue, ...value });
    saveInputData({ ...inputValue, ...value });
  };

  const input = {
    companyName: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'companyName'),
    contactPerson: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'contactPerson'),
    rank: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'rank'),
    contact: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'contact'),
    emailFront: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'email', 0),
    emailLast: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'email', 1),
    manufacturingField: (e: FormEvent<HTMLInputElement>) => {
      const object = { manufacturingField: [...inputValue.manufacturingField] };

      if (e.currentTarget.checked) object.manufacturingField.push(e.currentTarget.value);
      else object.manufacturingField = object.manufacturingField.filter((v) => v !== e.currentTarget.value);

      setInputValue({ ...inputValue, ...object });
      saveInputData({ ...inputValue, ...object });
    },
    numberOfPagesProduced: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'numberOfPagesProduced'),
    productionBudget: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'productionBudget'),
    retentionWebsiteAddress: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'retentionWebsiteAddress'),
    referenceSiteAddressFirst: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'referenceSiteAddress', 0),
    referenceSiteAddressSecond: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'referenceSiteAddress', 1),
    referenceSiteAddressThird: (e: FormEvent<HTMLInputElement>) => inputCommonFunc(e, 'referenceSiteAddress', 2),
    inquiriesAndRequirements: (e: FormEvent<HTMLTextAreaElement>) => inputCommonFunc(e, 'inquiriesAndRequirements'),
    preventionOfAutomaticRegistration: (e: FormEvent<HTMLInputElement>) => {
      const object = { preventionOfAutomaticRegistration: e.currentTarget.value };
      setInputValue({ ...inputValue, ...object });
    },
    file: (e: FormEvent<HTMLInputElement>) => setFile(e.currentTarget.files?.item(0) ?? undefined),
  };

  const selectEmail = (i: number) => {
    setSelectEmailIndex(i);
    const e = { currentTarget: { value: i ? EMAIL_LIST[i].host : '' } };
    inputCommonFunc(e, 'email', 1);
  };

  useEffect(() => {
    const saveData = sessionStorage.getItem('inputValue') ?? 'undefined';
    const MENT = '이전에 작성하던 데이터가 있습니다.\n불러오겠습니까?';
    if (saveData !== 'undefined') {
      if (confirm(MENT)) setInputValue({ ...inputValue, ...JSON.parse(saveData) });
      else sessionStorage.setItem('inputValue', 'undefined');
    }
  }, []);

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
                <input
                  onInput={input.companyName}
                  defaultValue={inputValue.companyName}
                  className="large"
                  type="text"
                  minLength={1}
                  maxLength={50}
                ></input>
              </div>
              <div>
                <span className="title">
                  담당자명<strong>*</strong>
                </span>
                <input
                  onInput={input.contactPerson}
                  defaultValue={inputValue.contactPerson}
                  className="small"
                  type="text"
                  minLength={1}
                  maxLength={20}
                ></input>
              </div>
              <div>
                <span className="title">직급</span>
                <input onInput={input.rank} defaultValue={inputValue.rank} className="small" type="text" minLength={1} maxLength={20}></input>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title">
                  연락처<strong>*</strong>
                </span>
                <input
                  onInput={(e) => onlyNumberInput(e, input.contact)}
                  defaultValue={inputValue.contact}
                  className="large"
                  type="text"
                  minLength={1}
                  maxLength={11}
                  placeholder='"-" 를 제외하고 입력해주세요.'
                ></input>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title">
                  이메일<strong>*</strong>
                </span>
                <input
                  onInput={input.emailFront}
                  defaultValue={inputValue.email[0]}
                  className="large"
                  type="text"
                  minLength={1}
                  maxLength={50}
                ></input>
                @
                {selectEmailIndex ? (
                  <input
                    key={0}
                    onChange={input.emailLast}
                    value={EMAIL_LIST[selectEmailIndex].host}
                    readOnly={true}
                    className={`large ${selectEmailIndex ? 'disable' : ''}`}
                    type="text"
                    minLength={1}
                    maxLength={50}
                  ></input>
                ) : (
                  <input
                    key={1}
                    onInput={input.emailLast}
                    defaultValue={inputValue.email[1]}
                    className={`large ${selectEmailIndex ? 'disable' : ''}`}
                    type="text"
                    minLength={1}
                    maxLength={50}
                  ></input>
                )}
                <button onClick={() => setIsOpenSelectEmailList(!isOpenSelectEmailList)} className={`list ${isOpenSelectEmailList ? 'open' : ''}`}>
                  {EMAIL_LIST[selectEmailIndex].name}
                  <ul>
                    {EMAIL_LIST.map((email, i) => (
                      <li className={selectEmailIndex === i ? 'select' : ''} onClick={() => selectEmail(i)} key={i}>
                        {email.name}
                      </li>
                    ))}
                  </ul>
                </button>
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
                {MANUFACTURING_FIELD.map((value, i) => (
                  <div key={i}>
                    <input
                      onChange={input.manufacturingField}
                      defaultChecked={inputValue.manufacturingField.findIndex((v) => v === value) !== -1}
                      type="checkbox"
                      value={value}
                    ></input>
                    <span className="check-box">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">제작 페이지 수</span>
                <input
                  onInput={input.numberOfPagesProduced}
                  defaultValue={inputValue.numberOfPagesProduced}
                  className="large"
                  type="text"
                  minLength={1}
                  maxLength={50}
                ></input>
              </div>
              <div>
                <span className="title align-center">제작 예산</span>
                <input
                  onInput={input.productionBudget}
                  defaultValue={inputValue.productionBudget}
                  className="large"
                  type="text"
                  minLength={1}
                  maxLength={50}
                ></input>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">보유 홈페이지 주소</span>
                <input
                  onInput={input.retentionWebsiteAddress}
                  defaultValue={inputValue.retentionWebsiteAddress}
                  className="large"
                  type="text"
                  minLength={1}
                  maxLength={100}
                ></input>
              </div>
              <div className="align-flex-start">
                <span className="title align-center padding-top">참고사이트 주소</span>
                <div className="col">
                  <input
                    onInput={input.referenceSiteAddressFirst}
                    defaultValue={inputValue.referenceSiteAddress[0]}
                    className="large"
                    type="text"
                    minLength={1}
                    maxLength={100}
                  ></input>
                  <input
                    onInput={input.referenceSiteAddressSecond}
                    defaultValue={inputValue.referenceSiteAddress[1]}
                    className="large"
                    type="text"
                    minLength={1}
                    maxLength={100}
                  ></input>
                  <input
                    onInput={input.referenceSiteAddressThird}
                    defaultValue={inputValue.referenceSiteAddress[2]}
                    className="large"
                    type="text"
                    minLength={1}
                    maxLength={100}
                  ></input>
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
                <textarea
                  defaultValue={inputValue.inquiriesAndRequirements}
                  onInput={input.inquiriesAndRequirements}
                  cols={100}
                  rows={10}
                  minLength={1}
                  maxLength={5000}
                ></textarea>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">
                  자동등록방지<strong>*</strong>
                </span>
                <div className="col left">
                  <div className="align-left gap">
                    <Image
                      onClick={changeChaptcha}
                      src={`${captcha.imgSrc}/${inputValue.captchaKey}`}
                      width={200}
                      height={90}
                      objectFit="cover"
                      alt="자동등록방지 이미지"
                    />
                    <input onInput={input.preventionOfAutomaticRegistration} className="small" type="text" minLength={1} maxLength={10}></input>
                  </div>
                  <span>(글자가 잘 안보이는 경우, 클릭하시면 새로운 글자가 나옵니다.)</span>
                </div>
              </div>
            </div>
            <div className="line">
              <div>
                <span className="title align-center">파일첨부</span>
                <div>
                  <span onClick={() => setFile(undefined)} className="input-box">
                    {file ? file.name : '첨부파일 없음'}
                  </span>
                  <label htmlFor="file">파일 불러오기</label>
                  <input
                    onChange={(e) => fileExtensionChange(e, ACCEPT_EXTENSIONS, CAPACITY_LIMIT, input.file)}
                    id="file"
                    type="file"
                    accept={ACCEPT_EXTENSIONS.map((e) => `.${e}`).join(', ')}
                  ></input>
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
            <input onChange={(e) => setLastCheck(e.currentTarget.checked)} className="checkbox" type="checkbox"></input>
            <span>위 사항에 동의하십니까?</span>
            <Link href={'/menual/agreement'}>
              <a target="_blank">전문보기</a>
            </Link>
          </div>
        </div>
        <button onClick={() => inputValueValidation(sendDataToServer)} className={`submit ${isSending ? 'sending' : ''}`}>
          {isSending ? '요청중...' : '상담 신청하기'}
        </button>
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

          span.input-box {
            position: relative;
            padding: 10px;
            cursor: pointer;
          }

          span.input-box::after {
            content: 'x';
            position: absolute;
            color: red;
            font-size: 20px;
            font-weight: bolder;
            top: -10px;
            opacity: 0;
            transition: opacity 0.3s;
          }

          span.input-box:hover::after {
            opacity: 1;
          }

          input,
          textarea,
          span.input-box,
          button.list,
          button.list > ul {
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

          input.large {
            width: 200px;
            height: 40px;
          }

          input.small,
          button.list {
            width: 120px;
            height: 40px;
          }

          input[type='file'] {
            display: none;
          }

          input.disable {
            filter: brightness(1.04);
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

          button.list {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-right: 15px;
          }

          button.list::before {
            content: '';
            position: absolute;
            right: 10px;
            width: 7px;
            height: 7px;
            border-bottom: 2px solid black;
            border-right: 2px solid black;
            box-sizing: border-box;
            transform: rotate(225deg);
            transition: transform 0.3s ease-in-out;
          }

          button.list.open::before {
            transform: rotate(45deg);
          }

          button.list > ul {
            position: absolute;
            visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            top: calc(100% + 5px);
            right: -1px;
            width: 120px;
            height: 100px;
            box-sizing: border-box;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            overflow-y: scroll;
            z-index: 1;
          }

          button.list.open > ul {
            visibility: visible;
          }

          button.list > ul > li {
            list-style: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding: 5px 0;
            width: 100%;
            font-size: 12px;
            transition: background-color 0.3s;
          }

          button.list > ul > li:nth-last-child(1) {
            border-bottom: none;
          }

          button.list > ul > li:hover,
          button.list > ul > li.select {
            background-color: rgb(220, 220, 220);
          }

          button.submit {
            background-color: #4a4a4a;
            font-size: 18px;
            color: white;
            padding: 20px 100px;
            border-radius: 50px;
          }

          @media screen and (max-width: 1250px) {
            div.line {
              gap: 0;
              padding-left: 0;
              padding-right: 0;
            }
          }

          @media screen and (max-width: 1150px) {
            div.line {
              flex-direction: column;
              gap: 20px;
            }

            .line span.title {
              text-align: center;
              padding-right: 0;
            }

            textarea {
              width: 50vw;
            }

            .agreement {
              font-size: 12px;
            }
          }

          @media screen and (max-width: 950px) {
            .line > div {
              gap: 5px;
            }

            .agreement {
              font-size: 10px;
            }
          }

          @media screen and (max-width: 850px) {
            div.line {
              align-items: flex-start;
              padding-left: 30vw;
            }

            .line span.title {
              padding: 0;
            }

            .line > div {
              position: relative;
              flex-direction: column;
              align-items: flex-start;
            }

            .line > div > span {
              position: absolute;
              right: 100%;
            }

            .agreement {
              padding: 15px;
            }
          }

          @media screen and (max-width: 500px) {
            div.line {
              padding-left: 120px;
            }
          }
          @media screen and (max-width: 450px) {
            .question {
              font-size: 20px;
              padding-bottom: 24px;
            }

            div.line {
              padding-left: 0px;
              align-items: center;
            }

            .line > div {
              align-items: center;
            }

            .line > div > div {
              width: 100%;
            }

            .line div.align-flex-start {
              align-items: center;
            }

            .line > div > span {
              position: relative;
              right: 0;
              margin-bottom: 10px;
            }

            input.small {
              width: 200px;
            }

            button.list {
              width: 200px;
            }

            .line span.check-box {
              width: 100%;
              margin-left: 15px;
            }

            button.submit {
              font-size: 15px;
            }
          }
          @media screen and (max-width: 400px) {
            .question {
              font-size: 16px;
              padding-bottom: 28px;
            }

            .line div.align-left {
              flex-direction: column;
              justify-content: center;
            }

            .line > div > div > span {
              text-align: center;
              font-size: 10px;
            }

            button.submit {
              padding: 20px 50px;
            }
          }
          @media screen and (max-width: 300px) {
            .question {
              font-size: 14px;
              padding-bottom: 30px;
            }
          }
        `}
      </style>
    </WebsiteLayout>
  );
};

export default ProjectInquiry;

export const getServerSideProps = async () => {
  const { SERVER_HOST, SERVER_PORT } = process.env;
  const HOST = `http://${SERVER_HOST}:${SERVER_PORT}`;
  let cpk = '';

  try {
    const data: { cpk: string } = await (await fetch(`${HOST}/api/captchaKey`, { method: 'GET' })).json();
    cpk = data.cpk;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      captcha: {
        imgSrc: `${HOST}/api/captchaImage`,
        cpk,
      },
    },
  };
};
