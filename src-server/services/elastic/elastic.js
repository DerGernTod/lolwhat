import { exec } from 'child_process';
import fetch from 'node-fetch';
import lolWhatConfig from '@/../config/lolwhat.config.json';

const ELASTIC_URL = 'http://localhost:9200/';

export default function launchElastic() {
  console.log('elastic instance started');
  return exec(`"${lolWhatConfig.elasticExec}" -Epath.conf=./config`, (err, stdout, stderr) => {
    if (err) {
      console.error(`${err}\nPlease make sure you configured lolwhat.config.json correctly.`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}

function elasticFetch(path, options) {
  return fetch(`${ELASTIC_URL}lolwhat/${path}`, options).then(res => res.json());
}

export function searchData(documentPath, searchBody) {
  return elasticFetch(documentPath, {
    method: 'POST',
    body: JSON.stringify(searchBody),
  });
}

export function getData(documentPath) {
  return elasticFetch(documentPath, {
    method: 'GET',
  });
}

export function putData(documentPath, data) {
  return elasticFetch(documentPath, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
