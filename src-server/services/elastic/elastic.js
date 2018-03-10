import { exec } from 'child_process';
import fetch, { Headers } from 'node-fetch';
import lolWhatConfig from '@/../config/lolwhat.config.json';

const ELASTIC_URL = 'http://localhost:9200/';

function processCallback(err, stdout, stderr) {
  if (err) {
    console.error(`${err}\nPlease make sure you configured lolwhat.config.json correctly.`);
    return;
  }
  console.log(stdout);
  console.log(stderr);
}

export default function launchElastic() {
  exec(`"${lolWhatConfig.elasticExec}"`, processCallback);
  console.log(`elastic instance at ${ELASTIC_URL}`);
  exec(`"${lolWhatConfig.kibanaExec}" -e ${ELASTIC_URL}`, processCallback);
  console.log('kibana instance at port 5601');
}

async function elasticFetch(path, options) {
  const headers = options.headers || new Headers();
  headers.set('Content-Type', 'application/json');
  const res = await fetch(`${ELASTIC_URL}lolwhat/${path}`, {
    ...options,
    headers,
  });
  console.log(`elastic request to '${path}'`);
  return res.json();
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
