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
};

const ProjectInquiry: NextPage = () => {
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
  });
  const [file, setFile] = useState<File>();
  const [lastCheck, setLastCheck] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const ACCEPT_EXTENSIONS = ['gif', 'jpg', 'png', 'pdf'];
  const MANUFACTURING_FIELD = ['홈페이지', '쇼핑몰', '디자인', '이벤트 랜딩', '기타'];
  const CAPACITY_LIMIT = 41943040; //바이트 단위 (40MB);

  const saveInputData = (saveData: inputValueType) => sessionStorage.setItem('inputValue', JSON.stringify(saveData));

  const inputValueValidation = (successCallback: Function) => {
    if (isSending) alert('현재 요청 중 입니다.\n잠시만 기다려주세요.');
    const { companyName, contactPerson, rank, contact, email, inquiriesAndRequirements, preventionOfAutomaticRegistration } = inputValue;

    if (!companyName) alert('업체명을 작성해주세요.');
    else if (!contactPerson) alert('담당자명을 작성해주세요.');
    else if (!rank) alert('직급을 작성해주세요.');
    else if (!contact) alert('연락처를 작성해주세요.');
    else if (!email[0] || !email[1]) alert('이메일을 작성해주세요.');
    else if (!inquiriesAndRequirements) alert('문의 및 요구사항을 작성해주세요.');
    else if (!preventionOfAutomaticRegistration) alert('자동등록방지를 작성해주세요.');
    else if (!lastCheck) alert('개인정보 수집 및 이용 동의를 체크해주세요.');
    else successCallback();
  };

  const sendDataToServer = async () => {
    setIsSending(true);
    const url = '/api/hello';
    const form = new FormData();

    if (file) form.append('file', file);
    form.append('data', JSON.stringify(inputValue));

    const response = await fetch(url, { method: 'POST', body: form });
    console.log(response);
    if (response.ok) alert('신청이 완료되었습니다.\n빠른 시일내에 답변 드리도록 하겠습니다.');
    else alert('오류가 발생하였습니다.\n잠시 후 다시 시도해 주세요.');
    setIsSending(false);
    sessionStorage.setItem('inputValue', 'undefined');
    window.location.href = '/';
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
      else object.manufacturingField.filter((v) => v !== e.currentTarget.value);

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
                <span className="title">
                  직급<strong>*</strong>
                </span>
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
                <input
                  onInput={input.emailLast}
                  defaultValue={inputValue.email[1]}
                  className="large"
                  type="text"
                  minLength={1}
                  maxLength={50}
                ></input>
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
                {MANUFACTURING_FIELD.map((value, i) => (
                  <div key={i}>
                    <input
                      onChange={input.manufacturingField}
                      checked={inputValue.manufacturingField.findIndex((v) => v === value) !== -1}
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
                    <Image src="/null.png" width={100} height={40} objectFit="cover" alt="자동등록방지 이미지" />
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

          input.large {
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
