// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { inputValueType } from '../website/project-inquiry';
import formidable, { IncomingForm } from 'formidable';
import { writeFileSync } from 'fs';
import PersistentFile from 'formidable/PersistentFile';

export const config = {
  api: {
    bodyParser: false,
    // bodyParser: {
    //   sizeLimit: '40mb',
    // },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) res.status(500).json({ result: err });

    if (typeof fields.data === 'string') console.log(JSON.parse(fields.data));
    console.log(files.file);
  });

  res.status(200).json({ result: 'success!' });
}
