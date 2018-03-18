import * as fs from 'fs';
import * as request from 'request';
import * as path from 'path';

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = '/';
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      console.log(`trying to create path ${curDir}`);
      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }

      console.log(`Directory ${curDir} already exists!`);
    }

    return curDir;
  }, initDir);
}

export default (uri, filename, filePath) => new Promise((resolve, reject) => {
  request.head(uri, (err, res) => {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    if (err) {
      reject(err);
      return;
    }
    const fullPath = `./static/${filePath}`;
    try {
      mkDirByPathSync(fullPath);
      request(uri).pipe(fs.createWriteStream(`${fullPath}/${filename}`)).on('close', resolve);
    } catch (e) {
      reject(e);
    }
  });
});

