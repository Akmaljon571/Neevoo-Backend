import { v4 } from 'uuid';
import { Storage } from '@google-cloud/storage';
import { extname, join, resolve } from 'path';

const projectId = 'peerless-watch-382417';
const keyFilename = resolve(process.cwd(), 'src', 'utils', 'key.json');
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket('course_hunter');

export const googleCloud = (file: any | any[]) => {
  if (!file.length) {
    const a: any[] = [];
    a.push(file);
    const imageLink = join(v4() + extname(a[0]?.originalname));
    const blob = bucket.file(imageLink);
    const blobStream = blob.createWriteStream();

    blobStream.end(a[0]?.buffer);
    return imageLink;
  } else if (file.length) {
    const result: string[] = [];
    for (let i = 0; i < file.length; i++) {
      const imageLink = join(v4() + extname(file[i].originalname));
      const blob = bucket.file(imageLink);
      const blobStream = blob.createWriteStream();
      result.push(imageLink);

      blobStream.end(file[i].buffer);
    }
    return result;
  }
};
