import { spawn } from 'child_process';
import fetch, { Headers } from 'node-fetch';
import lolWhatConfig from '@/../config/lolwhat.config.json';
import { summonerIndex, staticIndex } from '@/services/elastic/indices';
import to from '&/utils/to';
import timeout from '&/utils/timeout';
import { fetchRiotApi } from '../riotapi/riotapi';

const ELASTIC_URL = 'http://localhost:9200/';
const spawnedProcesses = [];
async function elasticFetch(path, options) {
  const headers = options.headers || new Headers();
  headers.set('Content-Type', 'application/json');
  const res = await fetch(`${ELASTIC_URL}${path}`, {
    ...options,
    headers,
  });
  console.log(`elastic request to '${ELASTIC_URL}${path}'`);
  const jsonRes = await res.json();
  if (jsonRes.error) {
    throw new Error(jsonRes.error.message || JSON.stringify(jsonRes.error));
  }
  return jsonRes;
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

export async function getOrCreateElasticData(indexUrl, apiUrl, validUntil, enrichDocument) {
  let [err, data] = await to(getData(indexUrl));
  let responseJson;
  if (!err && data.found) {
    responseJson = data._source;
  }
  if (responseJson && responseJson.validUntil > Date.now()) {
    return responseJson;
  }
  console.log(`no valid data for ${indexUrl} or data became invalid. data/error:`, data, err);
  console.log('fetching from riot api...');
  [err, data] = await to(fetchRiotApi(apiUrl));
  console.log('got riot api result. error:', err);
  if (!err) {
    data.validUntil = validUntil;
    if (enrichDocument) {
      console.log('trying to enrich document');
      data = await enrichDocument(data);
    }
    const [putErr, putResult] = await to(putData(indexUrl, data));
    console.log(`elastic putData result for ${indexUrl}`, putResult, putErr);
    return data;
  }
  console.log(`error for api call to ${apiUrl}: ${JSON.stringify(err)}. delivering probably outdated result.`);
  return responseJson;
}

async function initializeIndices() {
  /* eslint-disable no-await-in-loop */
  let error = true;
  while (error) {
    await timeout(1000);
    try {
      await getData('');
      error = false;
    } catch (e) {
      console.log('waiting for elastic service to be available...');
    }
  }
  console.log('creating elastic indices');
  /* eslint-enable no-await-in-loop */
  let [err] = await to(putData('static', staticIndex));
  if (err && JSON.parse(err.message).type !== 'resource_already_exists_exception') { console.error('error creating `static` index:', err); }
  [err] = await to(putData('summoner', summonerIndex));
  if (err && JSON.parse(err.message).type !== 'resource_already_exists_exception') { console.error('error creating `summoner` index:', err); }
}

function spawnProcess(process, args, name, errorsOnly) {
  const spawnedProcess = spawn(process, args);
  if (!errorsOnly) {
    spawnedProcess.stdout.on('data', data => console.log(`[${name}/out] ${data}`));
  }
  spawnedProcess.stderr.on('data', data => console.log(`[${name}/err] ${data}`));
  spawnedProcess.on('close', code => console.log(`[${name}] shut down with code ${code}`));
  return spawnedProcess;
}

export function shutdownProcesses() {
  spawnedProcesses.forEach(process => process.kill('SIGKILL'));
}

export default async function launchElastic() {
  spawnedProcesses.push(spawnProcess(lolWhatConfig.elasticExec, [], 'ELASTIC'));
  console.log(`elastic instance at ${ELASTIC_URL}`);
  spawnedProcesses.push(spawnProcess(lolWhatConfig.kibanaExec, ['-e', ELASTIC_URL], 'KIBANA', true));
  console.log('kibana instance at port 5601');
  return initializeIndices();
}

