import { FormEvent } from 'react';

const onlyNumberInput = (e: FormEvent<HTMLInputElement>, callback?: Function) => {
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
  if (callback) callback(e);
};

const fileExtensionChange = (e: FormEvent<HTMLInputElement>, extensions: string[], capacityLimit: number, callback: Function) => {
  const fileName = e.currentTarget.value;
  const isAccept =
    extensions.findIndex((extension) => {
      const reg = new RegExp(`^.+\.${extension}$`, 'gi');
      return reg.test(fileName);
    }) !== -1;

  if (!isAccept) {
    alert(`올바르지 않은 확장자입니다.\n(허용: ${extensions.map((e) => `.${e}`).join(', ')})`);
    return;
  }

  const filesize = e.currentTarget.files?.item(0)?.size;

  if (!filesize) {
    alert('파일 업로드 오류');
    return;
  }

  if ((filesize as number) > capacityLimit) {
    alert(`용량이 너무 큽니다.\n용량제한: ${capacityLimit / 1024 / 1024}MB`);
    return;
  }

  callback(e);
};

export { onlyNumberInput, fileExtensionChange };
